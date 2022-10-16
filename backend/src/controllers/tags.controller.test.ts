import { NextFunction, Request, Response } from 'express';
import timekeeper from 'timekeeper';

import tagsDbService from '@/services/tagsDb.service';
import postTagFixture from '@/tests/fixtures/tags/postTag.fixture';
import postTagMinLengthFixture from '@/tests/fixtures/tags/postTagMinLength.fixture';
import postTagResponseFixture from '@/tests/fixtures/tags/postTagResponse.fixture';
import postTagsFixture from '@/tests/fixtures/tags/postTags.fixture';
import postTagsResponseFixture from '@/tests/fixtures/tags/postTagsResponse.fixture';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

import tagsController from './tags.controller';

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();
const mockNextFunctionError = jest.fn();

const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  status: mockResponseStatus.mockReturnThis(),
};

const mockNextFunction: NextFunction = mockNextFunctionError;

describe('Tags Controller', () => {
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

  describe('Add Tag', () => {
    test('Expect to return 400 tag validation failed', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
      };

      // * Controller: add tag
      await tagsController
        .addTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
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
        .addTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: postTagResponseFixture,
        message: 'Tag added',
      });

      // * DB Service: find tag just added
      const addedTag = await tagsDbService
        .findTag(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(addedTag).toBeTruthy();
      expect(addedTag).toEqual(postTagResponseFixture);
    });
  });

  describe('Delete Tag', () => {
    test('Expect to return 404 tag not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
      };

      // * Controller: delete tag
      await tagsController
        .deleteTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Tag not found',
        }),
      );
    });

    test('Expect to return 200 tag deleted', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
      };

      // * DB Service: add tag to be deleted
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * Controller: delete tag
      await tagsController
        .deleteTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: postTagResponseFixture,
        message: 'Tag deleted',
      });

      // * DB Service: expect to not find tag just deleted
      const deletedTag = await tagsDbService
        .findTag(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(deletedTag).not.toBeTruthy();
    });
  });

  describe('Get Tag', () => {
    test('Expect to return 404 tag not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
      };

      // * Controller: get tag
      await tagsController
        .getTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Tag not found',
        }),
      );
    });

    test('Expect to return 200 get tag', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: postTagFixture._id },
      };

      // * DB Service: add tag to be get
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * Controller: get tag
      await tagsController
        .getTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: postTagResponseFixture,
        message: 'Tag fetched successfully',
      });
    });
  });

  describe('Get Tags', () => {
    test('Expect to return 404 tags not found', async () => {
      const mockRequest: Partial<Request> = {};

      // * Controller: get tags
      await tagsController
        .getTags(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Tags not found. Add Tags',
        }),
      );
    });

    test('Expect to return 200 get tags', async () => {
      const mockRequest: Partial<Request> = {};

      // * DB Service: add tags to be get
      await tagsDbService.addTags(postTagsFixture as any).catch((error): void => console.log(error));

      // * Controller: get tags
      await tagsController
        .getTags(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: postTagsResponseFixture,
        message: 'Tags fetched successfully',
      });
    });
  });

  describe('Update Tag', () => {
    test('Expect to return 400 empty request body', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
        params: { id: postTagFixture._id },
      };

      // * DB Service: add tag to be updated
      await tagsDbService.addTag(postTagFixture as any).catch((error): void => console.log(error));

      // * Controller: update tag
      await tagsController
        .updateTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
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
        .updateTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
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
        .updateTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Tag not found',
        }),
      );
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
        .updateTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: { ...postTagResponseFixture, tag: 'Test updated tag' },
        message: 'Tag updated',
      });

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
