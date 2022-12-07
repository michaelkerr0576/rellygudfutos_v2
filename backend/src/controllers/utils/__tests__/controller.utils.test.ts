import { Response } from 'express';

import controllerUtils from '../controller.utils';

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();
const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  status: mockResponseStatus.mockReturnThis(),
};

describe('Controller Utils', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('Get Pagination Query', () => {
    test('Expect to return valid pagination query object', () => {
      const limit = '1';
      const maxLimit = 5;
      const page = '2';

      const getPaginationQuery = controllerUtils.getPaginationQuery(limit, maxLimit, page);

      expect(getPaginationQuery).toStrictEqual({
        endIndex: 2,
        limit: 1,
        page: 2,
        startIndex: 1,
      });
    });

    test('Expect limit to only go as far as the max limit', () => {
      const limit = '25';
      const maxLimit = 5;
      const page = '1';

      const getPaginationQuery = controllerUtils.getPaginationQuery(limit, maxLimit, page);

      expect(getPaginationQuery).toStrictEqual({
        endIndex: 5,
        limit: 5,
        page: 1,
        startIndex: 0,
      });
    });
  });

  describe('Get Pagination Response', () => {
    test('Expect to return valid pagination response', () => {
      const endIndex = 3;
      const limit = 3;
      const page = 1;
      const startIndex = 0;
      const total = 3;

      const getPaginationResponse = controllerUtils.getPaginationResponse(
        endIndex,
        limit,
        page,
        startIndex,
        total,
      );

      expect(getPaginationResponse).toStrictEqual({
        limit: 3,
        page: 1,
        pages: 1,
        total: 3,
      });
    });

    test('Expect to return valid pagination response with next', () => {
      const endIndex = 5;
      const limit = 5;
      const page = 1;
      const startIndex = 0;
      const total = 25;

      const getPaginationResponse = controllerUtils.getPaginationResponse(
        endIndex,
        limit,
        page,
        startIndex,
        total,
      );

      expect(getPaginationResponse).toStrictEqual({
        limit: 5,
        next: {
          limit: 5,
          page: 2,
        },
        page: 1,
        pages: 5,
        total: 25,
      });
    });

    test('Expect to return valid pagination response with previous', () => {
      const endIndex = 25;
      const limit = 5;
      const page = 5;
      const startIndex = 20;
      const total = 25;

      const getPaginationResponse = controllerUtils.getPaginationResponse(
        endIndex,
        limit,
        page,
        startIndex,
        total,
      );

      expect(getPaginationResponse).toStrictEqual({
        limit: 5,
        page: 5,
        pages: 5,
        previous: {
          limit: 5,
          page: 4,
        },
        total: 25,
      });
    });

    test('Expect to return valid pagination response with next and previous', () => {
      const endIndex = 10;
      const limit = 5;
      const page = 2;
      const startIndex = 4;
      const total = 25;

      const getPaginationResponse = controllerUtils.getPaginationResponse(
        endIndex,
        limit,
        page,
        startIndex,
        total,
      );

      expect(getPaginationResponse).toStrictEqual({
        limit: 5,
        next: {
          limit: 5,
          page: 3,
        },
        page: 2,
        pages: 5,
        previous: {
          limit: 5,
          page: 1,
        },
        total: 25,
      });
    });
  });

  describe('Handle Duplicate Error', () => {
    test('Expect to return duplicate error', async () => {
      const mockMongoError = {
        code: 11000,
        name: 'MongoError',
      };
      const model = 'test';

      const mockPromise = new Promise((_resolve, reject) => {
        reject(controllerUtils.handleDuplicateError(mockResponse as Response, mockMongoError as any, model));
      });

      expect(mockResponse.status).toBeCalledWith(400);
      await expect(mockPromise).rejects.toThrowError('test already exists');
    });

    test('Expect to return default error', async () => {
      const mockError = new Error('test error');
      const model = 'test';

      const mockPromise = new Promise((_resolve, reject) => {
        reject(controllerUtils.handleDuplicateError(mockResponse as Response, mockError as any, model));
      });

      await expect(mockPromise).rejects.toThrowError('test error');
    });
  });

  describe('Handle Empty Body Request', () => {
    test('Expect to return empty body request error', async () => {
      const model = 'test';

      const mockPromise = new Promise((_resolve, reject) => {
        reject(controllerUtils.handleEmptyBodyRequest(mockResponse as Response, model));
      });

      expect(mockResponse.status).toBeCalledWith(400);
      await expect(mockPromise).rejects.toThrow('Empty test request body');
    });
  });

  describe('Handle File Type Error', () => {
    test('Expect to return file type error', async () => {
      const fileTypes = 'test1, test2';

      const mockPromise = new Promise((_resolve, reject) => {
        reject(controllerUtils.handleFileTypeError(mockResponse as Response, fileTypes));
      });

      expect(mockResponse.status).toBeCalledWith(400);
      await expect(mockPromise).rejects.toThrow('Only test1, test2 file types are allowed');
    });
  });

  describe('Handle Required Error', () => {
    test('Expect to return required error', async () => {
      const model = 'test';

      const mockPromise = new Promise((_resolve, reject) => {
        reject(controllerUtils.handleRequiredError(mockResponse as Response, model));
      });

      expect(mockResponse.status).toBeCalledWith(400);
      await expect(mockPromise).rejects.toThrow('test is required');
    });
  });

  describe('Handle Validation Error', () => {
    test('Expect to return validation error', async () => {
      const mockValidationError = {
        _message: 'test message',
        errors: [{ kind: 'test errors type 1', message: 'test errors message 1' }],
        name: 'ValidationError',
      };

      const mockPromise = new Promise((_resolve, reject) => {
        reject(controllerUtils.handleValidationError(mockResponse as Response, mockValidationError as any));
      });

      expect(mockResponse.status).toBeCalledWith(400);
      await expect(mockPromise).rejects.toThrowError('test message');
    });

    test('Expect to return default error', async () => {
      const mockError = new Error('test error');

      const mockPromise = new Promise((_resolve, reject) => {
        reject(controllerUtils.handleValidationError(mockResponse as Response, mockError as any));
      });

      await expect(mockPromise).rejects.toThrowError('test error');
    });
  });
});
