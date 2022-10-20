import { NextFunction, Request, Response } from 'express';
import timekeeper from 'timekeeper';

import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import photoEnumFixture from '@/tests/fixtures/photos/negative/photoEnum.fixture';
import photoRequiredFixture from '@/tests/fixtures/photos/negative/photoRequired.fixture';
import photoRequestFixture from '@/tests/fixtures/photos/photoRequest.fixture';
import photoResponseFixture from '@/tests/fixtures/photos/photoResponse.fixture';
import photosRequestFixture from '@/tests/fixtures/photos/photosRequest.fixture';
import photosResponseFixture from '@/tests/fixtures/photos/photosResponse.fixture';
import tagsResponseFixture from '@/tests/fixtures/photos/photoTagsResponse.fixture';
import tagsRequestFixture from '@/tests/fixtures/tags/tagsRequest.fixture';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';
import * as enm from '@/ts/enums/db.enum';

import photosController from './photos.controller';

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();
const mockNextFunctionError = jest.fn();

const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  status: mockResponseStatus.mockReturnThis(),
};

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
      };

      // * DB Service: add tags as it is required for addPhoto
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: add photo
      await photosController
        .addPhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photoResponseFixture,
        message: 'Photo added',
      });

      // * DB Service: find photo just added
      const addedPhoto = await photosDbService
        .findPhoto(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(addedPhoto).toBeTruthy();
      expect(addedPhoto).toEqual(photoResponseFixture);

      // * DB Service: find tag and check tag photos have been updated
      const photoTagIds = photoRequestFixture.details.imageTags;
      const updatedTags = await tagsDbService
        .findTags(photoTagIds as any)
        .catch((error): void => console.log(error));

      expect(updatedTags).toBeTruthy();
      expect(updatedTags).toEqual(tagsResponseFixture);
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

      // * DB Service: add tags as it is required for addPhoto
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo to be deleted
      await photosDbService.addPhoto(photoRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: delete photo
      await photosController
        .deletePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: photoResponseFixture,
        message: 'Photo deleted',
      });

      // * DB Service: expect to not find photo just deleted
      const deletedPhoto = await photosDbService
        .findPhoto(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(deletedPhoto).not.toBeTruthy();
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

      // * DB Service: add tags as it is required for addPhoto
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo to be get
      await photosDbService.addPhoto(photoRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: get photo
      await photosController
        .getPhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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

      // * DB Service: add tags as it is required for addPhotos
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photos to be get
      await photosDbService.addPhotos(photosRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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

      // * DB Service: add tags as it is required for addPhotos
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photos to be get
      await photosDbService.addPhotos(photosRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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
        query: { tags: ['21224d776a326fb40f000003'] },
      };

      // * DB Service: add tags as it is required for addPhotos
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photos to be get
      await photosDbService.addPhotos(photosRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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

    test('Expect to return 200 get photos filtered by search', async () => {
      const mockRequest: Partial<Request> = {
        query: { search: 'TiTlE 3' },
      };

      // * DB Service: add tags as it is required for addPhotos
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photos to be get
      await photosDbService.addPhotos(photosRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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

      // * DB Service: add tags as it is required for addPhotos
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo to be get
      await photosDbService.addPhoto(photoRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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

      // * DB Service: add tags as it is required for addPhotos
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photos to be get
      await photosDbService.addPhotos(photosRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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

      // * DB Service: add tags as it is required for addPhotos
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photos to be get
      await photosDbService.addPhotos(photosRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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

      // * DB Service: add tags as it is required for addPhoto
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo to be updated
      await photosDbService.addPhoto(photoRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: update photo
      await photosController
        .updatePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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

      // * DB Service: add tags as it is required for addPhoto
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo to be updated
      await photosDbService.addPhoto(photoRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: update photo
      await photosController
        .updatePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

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

    test('Expect to return 200 photo updated', async () => {
      const mockRequest: Partial<Request> = {
        body: {
          ...photoRequestFixture,
          details: { ...photoRequestFixture.details, imageCaption: 'Test updated caption' },
        },
        params: { id: photoRequestFixture._id },
      };

      // * DB Service: add tags as it is required for addPhoto
      await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo to be updated
      await photosDbService.addPhoto(photoRequestFixture as any).catch((error): void => console.log(error));

      // * Controller: update photo
      await photosController
        .updatePhoto(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: {
          ...photoResponseFixture,
          details: { ...photoResponseFixture.details, imageCaption: 'Test updated caption' },
        },
        message: 'Photo updated',
      });

      // * DB Service: find photo just updated
      const addedPhoto = await photosDbService
        .findPhoto(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(addedPhoto).toBeTruthy();
      expect(addedPhoto).toEqual({
        ...photoResponseFixture,
        details: { ...photoResponseFixture.details, imageCaption: 'Test updated caption' },
      });
    });
  });
});
