import { Request, Response } from 'express';
import { Types } from 'mongoose';
// eslint-disable-next-line node/no-unpublished-import
import timekeeper from 'timekeeper';

import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import { postPhotoFixture, postPhotosFixture } from '@/tests/fixtures/photos';
import { postTagFixture } from '@/tests/fixtures/tags';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

import photosController from './photos.controller';

const freezeDate = new Date('2011-11-11T00:00:00.000Z');

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();

const mockResponse: Partial<Response> = {
  status: mockResponseStatus.mockReturnThis(),
  json: mockResponseJson,
};

const expectedTags = [
  {
    _id: new Types.ObjectId(postTagFixture._id),
    createdAt: freezeDate,
    tag: postTagFixture.tag,
    updatedAt: freezeDate,
  },
];

const expectedPhoto = {
  ...postPhotoFixture,
  _id: new Types.ObjectId(postPhotoFixture._id),
  createdAt: freezeDate,
  updatedAt: freezeDate,
  details: {
    ...postPhotoFixture.details,
    captureDate: new Date(postPhotoFixture.details.captureDate),
    imageTags: expectedTags,
  },
};

const [expectedFirstPhoto, expectedSecondPhoto] = postPhotosFixture;
const expectedPhotos = [
  {
    ...expectedFirstPhoto,
    _id: new Types.ObjectId(expectedFirstPhoto._id),
    createdAt: freezeDate,
    updatedAt: freezeDate,
    details: {
      ...expectedFirstPhoto.details,
      captureDate: new Date(expectedFirstPhoto.details.captureDate),
      imageTags: expectedTags,
    },
  },
  {
    ...expectedSecondPhoto,
    _id: new Types.ObjectId(expectedSecondPhoto._id),
    createdAt: freezeDate,
    updatedAt: freezeDate,
    details: {
      ...expectedSecondPhoto.details,
      captureDate: new Date(expectedSecondPhoto.details.captureDate),
      imageTags: expectedTags,
    },
  },
];

describe('Photo Controller', () => {
  beforeAll(async () => {
    mongoMemoryServer.connectDB();
    timekeeper.freeze(freezeDate);
  });
  afterEach(async () => {
    mongoMemoryServer.clearDB();
    mockResponseStatus.mockClear();
    mockResponseJson.mockClear();
  });
  afterAll(async () => {
    mongoMemoryServer.disconnectDB();
    timekeeper.reset();
  });

  describe('addPhoto', () => {
    test('Expect to return 400 photo validation failed', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
      };

      await photosController
        .addPhoto(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Photo validation failed',
        }),
      );
    });

    test('Expect to return 201 photo added', async () => {
      const mockRequest: Partial<Request> = {
        body: postPhotoFixture,
      };

      // * DB Service: add tag as it is required for addPhoto
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * Controller: add photo
      await photosController
        .addPhoto(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Photo added',
        }),
      );

      // * DB Service: find photo just added
      const addedPhoto = await photosDbService
        .findPhoto(freezeDate)
        .catch((error): void => console.log(error));

      expect(addedPhoto).toBeTruthy();
      expect(addedPhoto).toEqual(expectedPhoto);
    });
  });

  describe('deletePhoto', () => {
    test('Expect to return 404 photo not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postPhotoFixture._id },
      };

      await photosController
        .deletePhoto(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Photo not found',
      });
    });

    test('Expect to return 500 internal server error', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: '123' },
      };

      await photosController
        .deletePhoto(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Internal Server Error',
        }),
      );
    });

    test('Expect to return 200 photo deleted', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postPhotoFixture._id },
      };

      // * DB Service: add tag as it is required for addPhoto
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo
      await photosDbService.addPhoto(postPhotoFixture as any).catch((error): void => console.log(error));

      // * Controller: delete photo
      await photosController
        .deletePhoto(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Photo deleted',
        }),
      );

      // * DB Service: expect to not find photo just deleted
      const deletedPhoto = await photosDbService
        .findPhoto(freezeDate)
        .catch((error): void => console.log(error));

      expect(deletedPhoto).not.toBeTruthy();
    });
  });

  describe('getPhoto', () => {
    test('Expect to return 404 photo not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postPhotoFixture._id },
      };

      await photosController
        .getPhoto(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Photo not found',
      });
    });

    test('Expect to return 500 internal server error', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: '123' },
      };

      await photosController
        .getPhoto(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Internal Server Error',
        }),
      );
    });

    test('Expect to return 200 get photo', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postPhotoFixture._id },
      };

      // * DB Service: add tag as it is required for addPhoto
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photo
      await photosDbService.addPhoto(postPhotoFixture as any).catch((error): void => console.log(error));

      // * Controller: get photo
      await photosController
        .getPhoto(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedPhoto);
    });
  });

  describe('getPhotos', () => {
    test('Expect to return 404 photos not found', async () => {
      const mockRequest: Partial<Request> = {};

      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Photos not found. Add Photos',
      });
    });

    test('Expect to return 200 get photos', async () => {
      const mockRequest: Partial<Request> = {};

      // * DB Service: add tag as it is required for addPhotos
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * DB Service: add photos
      await photosDbService.addPhotos(postPhotosFixture as any).catch((error): void => console.log(error));

      // * Controller: get photos
      await photosController
        .getPhotos(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedPhotos);
    });
  });
});
