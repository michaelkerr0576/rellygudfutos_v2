import { NextFunction, Request, Response } from 'express';
import timekeeper from 'timekeeper';

import * as s3Middleware from '@/middlewares/s3.middleware';
import * as photosDbService from '@/services/photosDb.service';
import * as tagsDbService from '@/services/tagsDb.service';
import * as usersDbService from '@/services/usersDb.service';
import photoEnumFixture from '@/tests/fixtures/photos/negative/photoEnum.fixture';
import photoRequiredFixture from '@/tests/fixtures/photos/negative/photoRequired.fixture';
import photoIdFixture from '@/tests/fixtures/photos/photoId.fixture';
import photoImageFixture from '@/tests/fixtures/photos/photoImage.fixture';
import photoRequestFixture from '@/tests/fixtures/photos/photoRequest.fixture';
import photoResponseFixture from '@/tests/fixtures/photos/photoResponse.fixture';
import photosResponseFixture from '@/tests/fixtures/photos/photosResponse.fixture';
import photoTagIdsFixture from '@/tests/fixtures/photos/photoTagIds.fixture';
import photoTagsResponseFixture from '@/tests/fixtures/photos/photoTagsResponse.fixture';
import photoUserIdFixture from '@/tests/fixtures/photos/photoUserId.fixture';
import photoUserResponseFixture from '@/tests/fixtures/photos/photoUserResponse.fixture';
import tagsRequestFixture from '@/tests/fixtures/tags/tagsRequest.fixture';
import userAdminRequestFixture from '@/tests/fixtures/users/userAdminRequest.fixture';
import * as utilFixture from '@/tests/fixtures/util.fixture';
import * as mongoMemoryServer from '@/tests/mongoMemoryServer';
import * as photosScripts from '@/tests/scripts/photos.scripts';
import * as enm from '@/ts/enums/db.enum';
import * as generalUtils from '@/utils/general.utils';

import * as photosController from '../photos.controller';

const mockS3DeleteFile = jest
  .spyOn(s3Middleware, 'deleteFile')
  .mockImplementation(() => Promise.resolve() as any);
const mockS3GetFileUrl = jest
  .spyOn(s3Middleware, 'getFileUrl')
  .mockImplementation(() => Promise.resolve(photoResponseFixture.details.imageUrl));
const mockS3UploadFile = jest
  .spyOn(s3Middleware, 'uploadFile')
  .mockImplementation(() => Promise.resolve() as any);

jest.spyOn(generalUtils, 'generateKey').mockReturnValue(photoResponseFixture.details.imageKey);

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();
const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  locals: { user: { _id: userAdminRequestFixture._id } },
  status: mockResponseStatus.mockReturnThis(),
};

const mockNextFunctionError = jest.fn();
const mockNextFunction: NextFunction = mockNextFunctionError;

describe('Photos Controller', () => {
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

  describe('Add Photo', () => {
    test('Expect to return 404 tag not found in image tags', async () => {
      const mockRequest: Partial<Request> = {
        body: photoRequestFixture,
        file: photoImageFixture,
      };

      await photosController
        .addPhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toBeCalledWith(
        expect.objectContaining({
          message: 'Tag not found from Image Tags',
        }),
      );
    });

    test('Expect to return 400 photo validation failed', async () => {
      const mockRequest: Partial<Request> = {
        body: photoRequiredFixture,
        file: photoImageFixture,
      };

      await photosController
        .addPhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Photo validation failed',
        }),
      );
    });

    test('Expect to return 201 photo added', async () => {
      const mockRequest: Partial<Request> = {
        body: photoRequestFixture,
        file: photoImageFixture,
      };

      // * Script: populate memory server with test data
      await photosScripts.prepTagsAndUserData();

      // * Controller: add photo
      await photosController
        .addPhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * DB Service: find photo just added
      const addedPhoto = await photosDbService
        .findPhoto(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(addedPhoto).toBeTruthy();
      expect(addedPhoto).toEqual(photoResponseFixture);

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

      // * S3: expect photo to be added to bucket then photoUrl retrieved
      const { imageKey } = photoResponseFixture.details;
      const { buffer, mimetype } = photoImageFixture;
      expect(mockS3UploadFile).toHaveBeenCalledWith(buffer, imageKey, mimetype);
      expect(mockS3GetFileUrl).toHaveBeenCalledWith(imageKey);

      // * Response
      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photoResponseFixture,
        message: 'Photo added',
      });
    });
  });

  describe('Delete Photo', () => {
    test('Expect to return 404 photo not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: photoRequestFixture._id },
      };

      await photosController
        .deletePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Photo not found',
        }),
      );
    });

    test('Expect to return 200 photo deleted', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: photoRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotoData();

      // * Controller: delete photo
      await photosController
        .deletePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * DB Service: expect to not find photo just deleted
      const deletedPhoto = await photosDbService
        .findPhoto(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(deletedPhoto).not.toBeTruthy();

      // * DB Service: expect to not find photo in tags that was just deleted
      const isTagsPhotoFound = await tagsDbService
        .checkTagsPhotoExist(photoIdFixture)
        .catch((error): void => console.log(error));

      expect(isTagsPhotoFound).toBe(false);

      // * DB Service: expect to not find photo in user that was just deleted
      const isUserPhotoFound = await usersDbService
        .checkUserPhotoExists(photoIdFixture)
        .catch((error): void => console.log(error));

      expect(isUserPhotoFound).toBe(false);

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

  describe('Get Photo', () => {
    test('Expect to return 404 photo not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: photoRequestFixture._id },
      };

      await photosController
        .getPhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Photo not found',
        }),
      );
    });

    test('Expect to return 200 get photo', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: photoRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotoData();

      // * Controller: get photo
      await photosController
        .getPhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photoResponseFixture,
        message: 'Photo fetched successfully',
      });
    });
  });

  describe('Get Photos', () => {
    test('Expect to return 404 photos not found', async () => {
      const mockRequest: Partial<Request> = {
        query: {},
      };

      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Photos not found. Remove filter or add Photos',
        }),
      );
    });

    test('Expect to return 200 get photos default pagination', async () => {
      const mockRequest: Partial<Request> = {
        query: {},
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotosData();

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photosResponseFixture,
        message: 'Photos fetched successfully',
        pagination: {
          limit: 5,
          page: 1,
          pages: 1,
          total: 3,
        },
      });
    });

    test('Expect to return 200 get photos pagination page two, next and previous', async () => {
      const mockRequest: Partial<Request> = {
        query: { limit: '1', page: '2' },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotosData();

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [photosResponseFixture[1]],
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

    test('Expect to return 200 get photos filtered by tags', async () => {
      const mockRequest: Partial<Request> = {
        query: { tags: [tagsRequestFixture[1]._id] },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotosData();

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [photosResponseFixture[0], photosResponseFixture[1]],
        message: 'Photos fetched successfully',
        pagination: {
          limit: 5,
          page: 1,
          pages: 1,
          total: 2,
        },
      });
    });

    test('Expect to return 200 get photos filtered by user', async () => {
      const mockRequest: Partial<Request> = {
        query: { user: photoUserIdFixture as any },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotosData();

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [photosResponseFixture[0], photosResponseFixture[2]],
        message: 'Photos fetched successfully',
        pagination: {
          limit: 5,
          page: 1,
          pages: 1,
          total: 2,
        },
      });
    });

    test('Expect to return 200 get photos filtered by search', async () => {
      const mockRequest: Partial<Request> = {
        query: { search: 'TiTlE 3' },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotosData();

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [photosResponseFixture[2]],
        message: 'Photos fetched successfully',
        pagination: {
          limit: 5,
          page: 1,
          pages: 1,
          total: 1,
        },
      });
    });

    test('Expect to return 200 get photos sort random', async () => {
      const mockRequest: Partial<Request> = {
        query: { sort: enm.PhotoSortOptions.RANDOM },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotoData();

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [photoResponseFixture],
        message: 'Photos fetched successfully',
        pagination: undefined,
      });
    });

    test('Expect to return 200 get photos sort title za', async () => {
      const mockRequest: Partial<Request> = {
        query: { sort: enm.PhotoSortOptions.TITLE_ZA },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotosData();

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [photosResponseFixture[2], photosResponseFixture[1], photosResponseFixture[0]],
        message: 'Photos fetched successfully',
        pagination: {
          limit: 5,
          page: 1,
          pages: 1,
          total: 3,
        },
      });
    });

    test('Expect to return 200 get photos sort oldest', async () => {
      const mockRequest: Partial<Request> = {
        query: { sort: enm.PhotoSortOptions.OLDEST },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotosData();

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: [photosResponseFixture[2], photosResponseFixture[1], photosResponseFixture[0]],
        message: 'Photos fetched successfully',
        pagination: {
          limit: 5,
          page: 1,
          pages: 1,
          total: 3,
        },
      });
    });
  });

  describe('Update Photo', () => {
    test('Expect to return 400 empty request body', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
        params: { id: photoRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotoData();

      // * Controller: update photo
      await photosController
        .updatePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Empty Photo request body',
        }),
      );
    });

    test('Expect to return 400 photo validation failed', async () => {
      const mockRequest: Partial<Request> = {
        body: {
          ...photoRequestFixture,
          details: { ...photoRequestFixture.details, imageSize: photoEnumFixture.details.imageSize },
        },
        params: { id: photoRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotoData();

      // * Controller: update photo
      await photosController
        .updatePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Validation failed',
        }),
      );
    });

    test('Expect to return 404 photo not found', async () => {
      const mockRequest: Partial<Request> = {
        body: photoRequestFixture,
        params: { id: photoRequestFixture._id },
      };

      await photosController
        .updatePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Photo not found',
        }),
      );
    });

    test('Expect to return 200 photo updated and immutable fields to not be updated', async () => {
      const mockRequest: Partial<Request> = {
        body: {
          ...photoRequestFixture,
          details: {
            ...photoRequestFixture.details,
            captureDate: 'test immutable',
            imageCaption: 'test updated caption',
            imageFile: 'test immutable',
            originalImageName: 'test immutable',
            photographer: 'test immutable',
          },
          equipment: { ...photoRequestFixture.equipment, lensName: 'test updated lens name' },
        },
        params: { id: photoRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await photosScripts.prepPhotoData();

      // * Controller: update photo
      await photosController
        .updatePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * DB Service: find photo just updated
      const addedPhoto = await photosDbService
        .findPhoto(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      const expectedPhoto = {
        ...photoResponseFixture,
        details: {
          ...photoResponseFixture.details,
          imageCaption: 'test updated caption',
        },
        equipment: {
          ...photoResponseFixture.equipment,
          lensName: 'test updated lens name',
        },
      };

      expect(addedPhoto).toBeTruthy();
      expect(addedPhoto).toEqual(expectedPhoto);

      // * DB Service: find tag and check tag photos have been updated
      const updatedTags = await tagsDbService
        .findTags(photoTagIdsFixture)
        .catch((error): void => console.log(error));

      expect(updatedTags).toBeTruthy();
      expect(updatedTags).toEqual(photoTagsResponseFixture);

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: expectedPhoto,
        message: 'Photo updated',
      });
    });
  });
});
