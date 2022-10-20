import { Response } from 'express';
import timekeeper from 'timekeeper';

import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import photoIdFixture from '@/tests/fixtures/photos/photoId.fixture';
import photoQueryFixture from '@/tests/fixtures/photos/photoQuery.fixture';
import photoQueryResponseFixture from '@/tests/fixtures/photos/photoQueryResponse.fixture';
import photoRequestFixture from '@/tests/fixtures/photos/photoRequest.fixture';
import photoResponseFixture from '@/tests/fixtures/photos/photoResponse.fixture';
import photoTagIdsFixture from '@/tests/fixtures/photos/photoTagIds.fixture';
import photoTagsResponseFixture from '@/tests/fixtures/photos/photoTagsResponse.fixture';
import tagsRequestFixture from '@/tests/fixtures/tags/tagsRequest.fixture';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';
import * as enm from '@/ts/enums/db.enum';

import photosControllerUtils from './photosController.utils';

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();

const mockResponse: Partial<Response> = {
  json: mockResponseJson,
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
      // * DB Service: add tags as it is required for addPhoto
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo to be cancelled
      await photosDbService.addPhoto(photoRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add tags photos to be cancelled
      await tagsDbService.addTagPhotos(photoIdFixture, photoTagIdsFixture);

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
      const isTagPhotosFound = await tagsDbService
        .checkTagsPhotoExist(photoIdFixture)
        .catch((error): void => console.log(error));

      expect(isTagPhotosFound).toBe(false);
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
      // * DB Service: add tags as it is required for addPhoto
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo
      await photosDbService.addPhoto(photoRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add tags photos
      await tagsDbService.addTagPhotos(photoIdFixture, photoTagIdsFixture);

      // * Controller Utils: check photo tags exist
      const checkPhotoTagsExist = await photosControllerUtils.checkPhotoTagsExist(
        mockResponse as Response,
        photoTagIdsFixture,
      );

      expect(checkPhotoTagsExist).toBeUndefined();
    });
  });

  describe('Get Photos Filter', () => {
    test('Expect to return empty filter if no search and tags', () => {
      const search = '';
      const tags = [] as any;

      const filter = photosControllerUtils.getPhotosFilter(search, tags);

      expect(filter).toStrictEqual({});
    });

    test('Expect to return filter with columns and patterns if valid search and tags', () => {
      const search = 'test';
      const tags = photoQueryFixture.tags as any;

      const filter = photosControllerUtils.getPhotosFilter(search, tags);

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
      const customPhotoQuery = {} as any;
      const photosQuery = photosControllerUtils.getPhotosQuery(customPhotoQuery);

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
      // * DB Service: add tags as it is required for handleAddedPhoto
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * Controller Utils: handle added photo
      await photosControllerUtils.handleAddedPhoto(mockResponse as Response, photoResponseFixture as any);

      // * DB Service: find tag and check tag photos have been updated
      const photoTagIds = photoResponseFixture.details.imageTags;
      const updatedTags = await tagsDbService
        .findTags(photoTagIds as any)
        .catch((error): void => console.log(error));

      expect(updatedTags).toBeTruthy();
      expect(updatedTags).toEqual(photoTagsResponseFixture);

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photoResponseFixture,
        message: 'Photo added',
      });
    });
  });
});
