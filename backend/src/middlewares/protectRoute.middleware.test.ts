import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line node/no-unpublished-import
import timekeeper from 'timekeeper';

import usersDbService from '@/services/usersDb.service';
import { postUserAdminFixture, postUserFixture } from '@/tests/fixtures/users';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

import protectRoute from './protectRoute.middleware';

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest
    .fn()
    // * Admin Authorisation tests
    .mockReturnValueOnce({ id: '41224d776a326fb40f000001', role: 'USER' })
    .mockReturnValueOnce({ id: '41224d776a326fb40f000113', role: 'USER' })
    .mockReturnValueOnce({ id: '41224d776a326fb40f000003', role: 'ADMIN' })
    // * User Authorisation tests
    .mockReturnValueOnce({ id: '41224d776a326fb40f000001', role: 'USER' })
    .mockReturnValueOnce({ id: '41224d776a326fb40f000113', role: 'USER' })
    // * Default
    .mockReturnValue({ id: '41224d776a326fb40f000003', role: 'ADMIN' }),
}));

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();
const mockNextFunctionError = jest.fn();

const mockResponse: Partial<Response> = {
  status: mockResponseStatus.mockReturnThis(),
  json: mockResponseJson,
};

const mockNextFunction: NextFunction = mockNextFunctionError;

// ! Tests must be run all together - it depends on mock data returned from jsonwebtoken
describe('Protect Route Middleware', () => {
  beforeAll(async () => {
    mongoMemoryServer.connectDB();
    timekeeper.freeze(utilFixture.freezeDate);
  });
  afterEach(async () => {
    mongoMemoryServer.clearDB();
    mockResponseStatus.mockClear();
    mockResponseJson.mockClear();
    mockNextFunctionError.mockClear();
  });
  afterAll(async () => {
    mongoMemoryServer.disconnectDB();
    timekeeper.reset();
  });

  describe('Admin Authorisation', () => {
    test('Expect to return 401 no token provided', async () => {
      const mockRequest: Partial<Request> = {
        headers: { authorization: '' },
      };

      // * Middleware: admin authorisation
      await protectRoute.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockResponse.status).toBeCalledWith(401);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'No token provided',
        }),
      );
    });

    test('Expect to return 404 user not found', async () => {
      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserFixture as any).catch((error): void => console.log(error));

      // * Middleware: admin authorisation
      await protectRoute.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not found',
        }),
      );
    });

    test('Expect to return 401 user not authorized', async () => {
      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserFixture as any).catch((error): void => console.log(error));

      // * Middleware: admin authorisation
      await protectRoute.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockResponse.status).toBeCalledWith(401);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not authorized',
        }),
      );
    });

    test('Expect user authorized and go to next function', async () => {
      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserAdminFixture as any).catch((error): void => console.log(error));

      // * Middleware: admin authorisation
      await protectRoute.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockNextFunction).toHaveBeenCalledWith();
    });
  });

  describe('User Authorisation', () => {
    test('Expect to return 401 no token provided', async () => {
      const mockRequest: Partial<Request> = {
        headers: { authorization: '' },
      };

      // * Middleware: user authorisation
      await protectRoute.userAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockResponse.status).toBeCalledWith(401);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'No token provided',
        }),
      );
    });

    test('Expect to return 404 user not found', async () => {
      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserFixture as any).catch((error): void => console.log(error));

      // * Middleware: user authorisation
      await protectRoute.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not found',
        }),
      );
    });

    test('Expect user authorized and go to next function', async () => {
      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserFixture as any).catch((error): void => console.log(error));

      // * Middleware: user authorisation
      await protectRoute.userAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockNextFunction).toHaveBeenCalledWith();
    });
  });
});