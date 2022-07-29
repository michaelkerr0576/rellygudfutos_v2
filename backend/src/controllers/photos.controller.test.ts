import { Request, Response } from 'express';
import { Types } from 'mongoose';
// eslint-disable-next-line node/no-unpublished-import
import timekeeper from 'timekeeper';

import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import { postPhotoFixture } from '@/tests/fixtures/photos';
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

      // * DB Service: find photo just created
      const addedPhoto = await photosDbService
        .findPhoto(freezeDate)
        .catch((error): void => console.log(error));

      expect(addedPhoto).toBeTruthy();
      expect(addedPhoto!.details).toEqual({
        ...postPhotoFixture.details,
        captureDate: new Date(postPhotoFixture.details.captureDate),
        imageTags: [
          {
            _id: new Types.ObjectId(postTagFixture._id),
            createdAt: freezeDate,
            tag: postTagFixture.tag,
            updatedAt: freezeDate,
          },
        ],
      });
      expect(addedPhoto!.equipment).toEqual({ ...postPhotoFixture.equipment });
    });
  });

  describe('deletePhoto', () => {
    test('Expect to return 404 photo not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
      };

      await photosController
        .deletePhoto(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Photo not found',
      });
    });

    test('Expect to return 200 photo deleted', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
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
});
