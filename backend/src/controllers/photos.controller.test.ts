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

describe('Photo Controller', () => {
  const freezeDate = new Date('2011-11-11T00:00:00.000Z');

  beforeAll(async () => {
    timekeeper.freeze(freezeDate);
    mongoMemoryServer.connectDB();
  });
  afterAll(async () => {
    timekeeper.reset();
    mongoMemoryServer.disconnectDB();
  });

  const mockResponse: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe('addPhoto', () => {
    test('Expect to return 400 bad request photo validation failed', async () => {
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
});
