import { NextFunction, Request, Response } from 'express';
import timekeeper from 'timekeeper';

import tagsDbService from '@/services/tagsDb.service';
import tagMinLengthFixture from '@/tests/fixtures/tags/negative/tagMinLength.fixture';
import tagRequestFixture from '@/tests/fixtures/tags/tagRequest.fixture';
import tagResponseFixture from '@/tests/fixtures/tags/tagResponse.fixture';
import tagsResponseFixture from '@/tests/fixtures/tags/tagsResponse.fixture';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';
import tagsScripts from '@/tests/scripts/tags.scripts';

import tagsController from './tags.controller';

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();

const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  status: mockResponseStatus.mockReturnThis(),
};

const mockNextFunctionError = jest.fn();
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
        body: tagRequestFixture,
      };

      // * Controller: add tag
      await tagsController
        .addTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * DB Service: find tag just added
      const addedTag = await tagsDbService
        .findTag(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(addedTag).toBeTruthy();
      expect(addedTag).toEqual(tagResponseFixture);

      // * Response
      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: tagResponseFixture,
        message: 'Tag added',
      });
    });
  });

  describe('Delete Tag', () => {
    test('Expect to return 404 tag not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: tagRequestFixture._id },
      };

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
        params: { id: tagRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await tagsScripts.prepTagData();

      // * Controller: delete tag
      await tagsController
        .deleteTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * DB Service: expect to not find tag just deleted
      const deletedTag = await tagsDbService
        .findTag(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(deletedTag).not.toBeTruthy();

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: tagResponseFixture,
        message: 'Tag deleted',
      });
    });
  });

  describe('Get Tag', () => {
    test('Expect to return 404 tag not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: tagRequestFixture._id },
      };

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
        params: { id: tagRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await tagsScripts.prepTagData();

      // * Controller: get tag
      await tagsController
        .getTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: tagResponseFixture,
        message: 'Tag fetched successfully',
      });
    });
  });

  describe('Get Tags', () => {
    test('Expect to return 404 tags not found', async () => {
      const mockRequest: Partial<Request> = {
        query: {},
      };

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

    test('Expect to return 200 get tags default pagination', async () => {
      const mockRequest: Partial<Request> = {
        query: {},
      };

      // * Script: populate memory server with test data
      await tagsScripts.prepTagsData();

      // * Controller: get tags
      await tagsController
        .getTags(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: tagsResponseFixture,
        message: 'Tags fetched successfully',
        pagination: {
          limit: 50,
          page: 1,
          pages: 1,
          total: 3,
        },
      });
    });
  });

  describe('Update Tag', () => {
    test('Expect to return 400 empty request body', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
        params: { id: tagRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await tagsScripts.prepTagData();

      // * Controller: update tag
      await tagsController
        .updateTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
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
          ...tagRequestFixture,
          tag: tagMinLengthFixture.tag,
        },
        params: { id: tagRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await tagsScripts.prepTagData();

      // * Controller: update tag
      await tagsController
        .updateTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Validation failed',
        }),
      );
    });

    test('Expect to return 404 tag not found', async () => {
      const mockRequest: Partial<Request> = {
        body: tagRequestFixture,
        params: { id: tagRequestFixture._id },
      };

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
          ...tagRequestFixture,
          tag: 'Test updated tag',
        },
        params: { id: tagRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await tagsScripts.prepTagData();

      // * Controller: update tag
      await tagsController
        .updateTag(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * DB Service: find tag just updated
      const addedTag = await tagsDbService
        .findTag(utilFixture.freezeDate)
        .catch((error): void => console.log(error));

      expect(addedTag).toBeTruthy();
      expect(addedTag).toEqual({
        ...tagResponseFixture,
        tag: 'Test updated tag',
      });

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: { ...tagResponseFixture, tag: 'Test updated tag' },
        message: 'Tag updated',
      });
    });
  });
});
