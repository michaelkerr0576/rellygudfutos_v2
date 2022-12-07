import { Response } from 'express';
import timekeeper from 'timekeeper';

import s3Middleware from '@/middlewares/s3.middleware';
import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import usersDbService from '@/services/usersDb.service';
import photoIdFixture from '@/tests/fixtures/photos/photoId.fixture';
import photoQueryFixture from '@/tests/fixtures/photos/photoQuery.fixture';
import photoQueryResponseFixture from '@/tests/fixtures/photos/photoQueryResponse.fixture';
import photoResponseFixture from '@/tests/fixtures/photos/photoResponse.fixture';
import photosRequestFixture from '@/tests/fixtures/photos/photosRequest.fixture';
import photoTagIdsFixture from '@/tests/fixtures/photos/photoTagIds.fixture';
import photoTagsResponseFixture from '@/tests/fixtures/photos/photoTagsResponse.fixture';
import photoUserIdFixture from '@/tests/fixtures/photos/photoUserId.fixture';
import photoUserResponseFixture from '@/tests/fixtures/photos/photoUserResponse.fixture';
import userAdminRequestFixture from '@/tests/fixtures/users/userAdminRequest.fixture';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';
import photosScripts from '@/tests/scripts/photos.scripts';
import * as enm from '@/ts/enums/db.enum';

import photosControllerUtils from '../photosController.utils';

jest.mock('@aws-sdk/client-s3');
const mockS3DeleteFile = jest
  .spyOn(s3Middleware, 'deleteFile')
  .mockImplementation(() => Promise.resolve() as any);

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();
const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  locals: { user: { _id: userAdminRequestFixture._id } },
  status: mockResponseStatus.mockReturnThis(),
};

const mockError = new Error('test error');

describe('Photos Controller Utils', () => {
  beforeAll(async () => {
    await mongoMemoryServer.connectDB();
    timekeeper.freeze(utilFixture.freezeDate);
  });
  afterEach(async () => {
    await mongoMemoryServer.clearDB();
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await mongoMemoryServer.disconnectDB();
    timekeeper.reset();
  });

  describe('Cancel Add Photo', () => {
    test('Expect to continue error state if photo not found', async () => {
      await expect(
        photosControllerUtils.cancelAddPhoto(mockError, photoIdFixture, photoTagIdsFixture),
      ).rejects.toThrow('test error');
    });

    test('Expect to cancel photo added and continue error state', async () => {
      // * Script: populate memory server with test data
      await photosScripts.prepPhotoData();

      // * Controller Utils: cancel added photo
      await expect(
        photosControllerUtils.cancelAddPhoto(mockError, photoIdFixture, photoTagIdsFixture),
      ).rejects.toThrow('test error');

      // * DB Service: expect to not find photo just cancelled
      const cancelledPhoto = await photosDbService
        .findPhoto(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(cancelledPhoto).not.toBeTruthy();

      // * DB Service: expect to not find photo in tags that was just cancelled
      const isTagsPhotoFound = await tagsDbService
        .checkTagsPhotoExist(photoIdFixture)
        .catch((error): void => console.log(error));

      expect(isTagsPhotoFound).toBe(false);
    });
  });

  describe('Check Photo Tags Exist', () => {
    test('Expect to throw 404 error if tags are not found', async () => {
      await expect(
        photosControllerUtils.checkPhotoTagsExist(mockResponse as Response, photoTagIdsFixture),
      ).rejects.toThrow('Tag not found from Image Tags');

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to resolve the check if tags are found', async () => {
      // * Script: populate memory server with test data
      await photosScripts.prepPhotosData();

      // * Controller Utils: check photo tags exist
      const checkPhotoTagsExist = await photosControllerUtils.checkPhotoTagsExist(
        mockResponse as Response,
        photoTagIdsFixture,
      );

      expect(checkPhotoTagsExist).toBeUndefined();
    });
  });

  describe('Get Photos Filter', () => {
    test('Expect to return empty filter if no search, tags and user', () => {
      const search = '';
      const tags = [] as any;
      const user = '';

      const filter = photosControllerUtils.getPhotosFilter(search, tags, user);

      expect(filter).toStrictEqual({});
    });

    test('Expect to return filter with columns and patterns if valid search, tags and user', () => {
      const search = 'test';
      const tags = photoQueryFixture.tags as any;
      const user = photoQueryFixture.user as any;

      const filter = photosControllerUtils.getPhotosFilter(search, tags, user);

      expect(filter).toStrictEqual(photoQueryResponseFixture.filter);
    });
  });

  describe('Get Photos Sort', () => {
    test('Expect to return capture date sorted by newest', () => {
      const sort = enm.PhotoSortOptions.NEWEST;

      const photosSort = photosControllerUtils.getPhotosSort(sort);

      expect(photosSort).toStrictEqual({
        'details.captureDate': -1,
      });
    });

    test('Expect to return capture date sorted by oldest', () => {
      const sort = 'oldest' as any;

      const photosSort = photosControllerUtils.getPhotosSort(sort);

      expect(photosSort).toStrictEqual({
        'details.captureDate': 1,
      });
    });

    test('Expect to return image title sorted by a - z', () => {
      const sort = enm.PhotoSortOptions.TITLE_AZ;

      const photosSort = photosControllerUtils.getPhotosSort(sort);

      expect(photosSort).toStrictEqual({
        'details.imageTitle': 1,
      });
    });

    test('Expect to return image title sorted by z - a', () => {
      const sort = 'title_za' as any;

      const photosSort = photosControllerUtils.getPhotosSort(sort);

      expect(photosSort).toStrictEqual({
        'details.imageTitle': -1,
      });
    });

    test('Expect to return random sort', () => {
      const sort = enm.PhotoSortOptions.RANDOM;

      const photosSort = photosControllerUtils.getPhotosSort(sort);

      expect(photosSort).toStrictEqual(enm.PhotoSortOptions.RANDOM);
    });

    test('Expect to return default sort if not in PhotoSortOptions', () => {
      const sort = 'notInSortOptions' as any;

      const photosSort = photosControllerUtils.getPhotosSort(sort);

      expect(photosSort).toStrictEqual({
        'details.captureDate': -1,
      });
    });
  });

  describe('Get Photos Query', () => {
    test('Expect to return default photos query', () => {
      const query = {} as any;
      const photosQuery = photosControllerUtils.getPhotosQuery(query);

      expect(photosQuery).toStrictEqual({
        endIndex: 5,
        filter: {},
        limit: 5,
        page: 1,
        sort: {
          'details.captureDate': -1,
        },
        startIndex: 0,
      });
    });

    test('Expect to return custom photos query from request', () => {
      const photosQuery = photosControllerUtils.getPhotosQuery(photoQueryFixture as any);

      expect(photosQuery).toStrictEqual(photoQueryResponseFixture);
    });
  });

  describe('Handle Added Photo', () => {
    test('Expect to return 500 server error if photo that was added can not be found', async () => {
      const photo = null;

      await expect(photosControllerUtils.handleAddedPhoto(mockResponse as Response, photo)).rejects.toThrow(
        'Cannot find Photo just added',
      );

      expect(mockResponse.status).toBeCalledWith(500);
    });

    test('Expect to return 201 photo added', async () => {
      // * Script: populate memory server with test data
      await photosScripts.prepTagsAndUserData();

      // * Controller Utils: handle added photo
      await photosControllerUtils.handleAddedPhoto(mockResponse as Response, photoResponseFixture as any);

      // * DB Service: find tag and check tag photos have been added
      const addedTags = await tagsDbService
        .findTags(photoTagIdsFixture)
        .catch((error): void => console.log(error));

      expect(addedTags).toBeTruthy();
      expect(addedTags).toEqual(photoTagsResponseFixture);

      // * DB Service: find user and check user photo has been added
      const addedUser = await usersDbService
        .getUser(photoUserIdFixture)
        .catch((error): void => console.log(error));

      expect(addedUser).toBeTruthy();
      expect(addedUser).toEqual(photoUserResponseFixture);

      // * Response
      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photoResponseFixture,
        message: 'Photo added',
      });
    });
  });

  describe('Handle Deleted Photo', () => {
    test('Expect to return 404 photo not found', async () => {
      const photo = null;

      await expect(photosControllerUtils.handleDeletedPhoto(mockResponse as Response, photo)).rejects.toThrow(
        'Photo not found',
      );

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 photo deleted', async () => {
      // * Script: populate memory server with test data
      await photosScripts.prepPhotoData();

      // * Controller Utils: handle deleted photo
      await photosControllerUtils
        .handleDeletedPhoto(mockResponse as Response, photoResponseFixture as any)
        .catch((error): void => console.log(error));

      // * DB Service: expect to not find photo in tags that was just deleted
      const isTagsPhotoFound = await tagsDbService
        .checkTagsPhotoExist(photoIdFixture)
        .catch((error): void => console.log(error));

      expect(isTagsPhotoFound).toBe(false);

      // * S3: expect photo to be deleted from bucket
      const { imageKey } = photoResponseFixture.details;
      expect(mockS3DeleteFile).toHaveBeenCalledWith(imageKey);

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photoResponseFixture,
        message: 'Photo deleted',
      });
    });
  });

  describe('Handle Photo', () => {
    test('Expect to return 404 photo not found', async () => {
      const photo = null;

      await expect(photosControllerUtils.handlePhoto(mockResponse as Response, photo)).rejects.toThrow(
        'Photo not found',
      );

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 get photo', async () => {
      await photosControllerUtils.handlePhoto(mockResponse as Response, photoResponseFixture as any);

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photoResponseFixture,
        message: 'Photo fetched successfully',
      });
    });
  });

  describe('Handle Photos', () => {
    test('Expect to return 500 server error', async () => {
      const photos = null;

      await expect(
        photosControllerUtils.handlePhotos(
          mockResponse as Response,
          photos,
          photoQueryResponseFixture as any,
        ),
      ).rejects.toThrow('Cannot find Photos just added');

      expect(mockResponse.status).toBeCalledWith(500);
    });

    test('Expect to return 404 photos not found', async () => {
      const photos = [] as any;

      await expect(
        photosControllerUtils.handlePhotos(
          mockResponse as Response,
          photos,
          photoQueryResponseFixture as any,
        ),
      ).rejects.toThrow('Photos not found. Remove filter or add Photos');

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 get photos pagination page two, next and previous', async () => {
      // * Script: populate memory server with test data
      await photosScripts.prepPhotosData();

      // * Controller Utils: handle photos
      const photoQuery = { ...photoQueryResponseFixture, filter: {} } as any;
      await photosControllerUtils.handlePhotos(
        mockResponse as Response,
        photosRequestFixture as any,
        photoQuery,
      );

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photosRequestFixture,
        message: 'Photos fetched successfully',
        pagination: {
          limit: 1,
          next: { limit: 1, page: 3 },
          page: 2,
          pages: 3,
          previous: { limit: 1, page: 1 },
          total: 3,
        },
      });
    });
  });

  describe('Handle Updated Photo', () => {
    test('Expect to return 404 photo not found', async () => {
      const photo = null;

      await expect(photosControllerUtils.handleUpdatedPhoto(mockResponse as Response, photo)).rejects.toThrow(
        'Photo not found',
      );

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 photo updated', async () => {
      // * Script: populate memory server with test data
      await photosScripts.prepPhotoData();

      // * Controller Utils: handle updated photo
      await photosControllerUtils.handleUpdatedPhoto(mockResponse as Response, photoResponseFixture as any);

      // * DB Service: find tag and check tag photos have been updated
      const updatedTags = await tagsDbService
        .findTags(photoTagIdsFixture)
        .catch((error): void => console.log(error));

      expect(updatedTags).toBeTruthy();
      expect(updatedTags).toEqual(photoTagsResponseFixture);

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
    });
  });
});
