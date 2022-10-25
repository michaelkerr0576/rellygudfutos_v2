import { Response } from 'express';

import tagsControllerUtils from './tagsController.utils';

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();

const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  status: mockResponseStatus.mockReturnThis(),
};

describe('Tags Controller Utils', () => {
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
});
