import { Request, Response } from 'express';
// eslint-disable-next-line node/no-unpublished-import
import timekeeper from 'timekeeper';

import tagsDbService from '@/services/tagsDb.service';
import { postTagFixture, postTagResponseFixture } from '@/tests/fixtures/tags';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

import tagsController from './tags.controller';

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();

const mockResponse: Partial<Response> = {
  status: mockResponseStatus.mockReturnThis(),
  json: mockResponseJson,
};

describe('Tag Controller', () => {
  beforeAll(async () => {
    mongoMemoryServer.connectDB();
    timekeeper.freeze(utilFixture.freezeDate);
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

  describe('addTag', () => {
    test('Expect to return 400 tag validation failed', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
      };

      await tagsController
        .addTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Tag validation failed',
        }),
      );
    });

    test('Expect to return 201 tag added', async () => {
      const mockRequest: Partial<Request> = {
        body: postTagFixture,
      };

      await tagsController
        .addTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Tag added',
        }),
      );

      // * DB Service: find tag just added
      const addedTag = await tagsDbService
        .findTag(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(addedTag).toBeTruthy();
      expect(addedTag).toEqual(postTagResponseFixture);
    });
  });
});
