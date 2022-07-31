import { Request, Response } from 'express';
// eslint-disable-next-line node/no-unpublished-import
import timekeeper from 'timekeeper';

import tagsDbService from '@/services/tagsDb.service';
import {
  postTagFixture,
  postTagMinLengthFixture,
  postTagResponseFixture,
  postTagsFixture,
  postTagsResponseFixture,
} from '@/tests/fixtures/tags';
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

      // * Controller: add tag
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

      // * Controller: add tag
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

  describe('deleteTag', () => {
    test('Expect to return 404 tag not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
      };

      // * Controller: delete tag
      await tagsController
        .deleteTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Tag not found',
      });
    });

    test('Expect to return 200 tag deleted', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
      };

      // * DB Service: add tag to be deleted
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * Controller: delete tag
      await tagsController
        .deleteTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Tag deleted',
        }),
      );

      // * DB Service: expect to not find tag just deleted
      const deletedTag = await tagsDbService
        .findTag(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(deletedTag).not.toBeTruthy();
    });
  });

  describe('getTag', () => {
    test('Expect to return 404 tag not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
      };

      // * Controller: get tag
      await tagsController
        .getTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Tag not found',
      });
    });

    test('Expect to return 200 get tag', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
      };

      // * DB Service: add tag to be get
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * Controller: get tag
      await tagsController
        .getTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(postTagResponseFixture);
    });
  });

  describe('getTags', () => {
    test('Expect to return 404 tags not found', async () => {
      const mockRequest: Partial<Request> = {};

      // * Controller: get tags
      await tagsController
        .getTags(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Tags not found. Add Tags',
      });
    });

    test('Expect to return 200 get tags', async () => {
      const mockRequest: Partial<Request> = {};

      // * DB Service: add tags to be get
      await tagsDbService.addTags(postTagsFixture as any).catch((error): void => console.log(error));

      // * Controller: get tags
      await tagsController
        .getTags(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(postTagsResponseFixture);
    });
  });

  describe('updateTag', () => {
    test('Expect to return 400 empty request body', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
        params: { id: postTagFixture._id },
      };

      // * DB Service: add tag to be updated
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * Controller: update tag
      await tagsController
        .updateTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Empty Tag request body',
        }),
      );
    });

    test('Expect to return 400 tag validation failed', async () => {
      const mockRequest: Partial<Request> = {
        body: {
          ...postTagFixture,
          tag: postTagMinLengthFixture.tag,
        },
        params: { id: postTagFixture._id },
      };

      // * DB Service: add tag to be updated
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * Controller: update tag
      await tagsController
        .updateTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Validation failed',
        }),
      );
    });

    test('Expect to return 404 tag not found', async () => {
      const mockRequest: Partial<Request> = {
        body: postTagFixture,
        params: { id: postTagFixture._id },
      };

      // * Controller: update tag
      await tagsController
        .updateTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Tag not found',
      });
    });

    test('Expect to return 200 tag updated', async () => {
      const mockRequest: Partial<Request> = {
        body: {
          ...postTagFixture,
          tag: 'Test updated tag',
        },
        params: { id: postTagFixture._id },
      };

      // * DB Service: add tag to be updated
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * Controller: update tag
      await tagsController
        .updateTag(mockRequest as Request, mockResponse as Response)
        .catch((error): void => console.log(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Tag updated',
        }),
      );

      // * DB Service: find tag just updated
      const addedTag = await tagsDbService
        .findTag(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(addedTag).toBeTruthy();
      expect(addedTag).toEqual({
        ...postTagResponseFixture,
        tag: 'Test updated tag',
      });
    });
  });
});
