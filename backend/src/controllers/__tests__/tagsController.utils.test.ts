import { Response } from 'express';
import timekeeper from 'timekeeper';

import * as utilFixture from '@/tests/fixtures/util.fixture';
import * as mongoMemoryServer from '@/tests/mongoMemoryServer';
import * as tagsScripts from '@/tests/scripts/tags.scripts';

import * as tagsControllerUtils from '../utils/tagsController.utils';

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();
const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  status: mockResponseStatus.mockReturnThis(),
};

describe('Tags Controller Utils', () => {
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

  describe('Get Tags Query', () => {
    test('Expect to return default tags query', () => {
      const query = {} as any;
      const tagsQuery = tagsControllerUtils.getTagsQuery(query);

      expect(tagsQuery).toStrictEqual({
        endIndex: 50,
        limit: 50,
        page: 1,
        startIndex: 0,
      });
    });

    test('Expect to return custom tags query from request', () => {
      const query = { limit: '10', page: '2' } as any;
      const tagsQuery = tagsControllerUtils.getTagsQuery(query);

      expect(tagsQuery).toStrictEqual({
        endIndex: 20,
        limit: 10,
        page: 2,
        startIndex: 10,
      });
    });
  });

  describe('Handle Added Tag', () => {
    test('Expect to return 500 server error if tag that was added can not be found', async () => {
      const tag = null;

      await expect(tagsControllerUtils.handleAddedTag(mockResponse as Response, tag)).rejects.toThrow(
        'Cannot find Tag just added',
      );

      expect(mockResponse.status).toBeCalledWith(500);
    });

    test('Expect to return 201 tag added', async () => {
      const tag = { test: 'test' } as any;

      await tagsControllerUtils.handleAddedTag(mockResponse as Response, tag);

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: tag,
        message: 'Tag added',
      });
    });
  });

  describe('Handle Deleted Tag', () => {
    test('Expect to return 404 tag not found', async () => {
      const tag = null;

      await expect(tagsControllerUtils.handleDeletedTag(mockResponse as Response, tag)).rejects.toThrow(
        'Tag not found',
      );

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 tag deleted', async () => {
      const tag = { test: 'test' } as any;

      await tagsControllerUtils.handleDeletedTag(mockResponse as Response, tag);

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: tag,
        message: 'Tag deleted',
      });
    });
  });

  describe('Handle Tag', () => {
    test('Expect to return 404 tag not found', async () => {
      const tag = null;

      await expect(tagsControllerUtils.handleTag(mockResponse as Response, tag)).rejects.toThrow(
        'Tag not found',
      );

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 get tag', async () => {
      const tag = { test: 'test' } as any;

      await tagsControllerUtils.handleTag(mockResponse as Response, tag);

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: tag,
        message: 'Tag fetched successfully',
      });
    });
  });

  describe('Handle Tags', () => {
    test('Expect to return 404 tags not found', async () => {
      const tags = [] as any;
      const query = {} as any;

      await expect(tagsControllerUtils.handleTags(mockResponse as Response, tags, query)).rejects.toThrow(
        'Tags not found. Add Tags',
      );

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 get tags pagination page two, next and previous', async () => {
      const tags = [{ test: 'test' }] as any;
      const query = { endIndex: 2, limit: 1, page: 2, startIndex: 1 } as any;

      // * Script: populate memory server with test data
      await tagsScripts.prepTagsData();

      // * Controller Utils: handle tags
      await tagsControllerUtils.handleTags(mockResponse as Response, tags, query);

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: tags,
        message: 'Tags fetched successfully',
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
  });

  describe('Handle Updated Tag', () => {
    test('Expect to return 404 tag not found', async () => {
      const tag = null;

      await expect(tagsControllerUtils.handleUpdatedTag(mockResponse as Response, tag)).rejects.toThrow(
        'Tag not found',
      );

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 tag updated', async () => {
      const tag = { test: 'test' } as any;

      await tagsControllerUtils.handleUpdatedTag(mockResponse as Response, tag);

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: tag,
        message: 'Tag updated',
      });
    });
  });
});
