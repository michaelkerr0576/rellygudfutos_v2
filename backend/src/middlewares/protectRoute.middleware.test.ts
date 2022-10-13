import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import timekeeper from 'timekeeper';

import usersDbService from '@/services/usersDb.service';
import postUserFixture from '@/tests/fixtures/users/postUser.fixture';
import postUserAdminFixture from '@/tests/fixtures/users/postUserAdmin.fixture';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

import protectRouteMiddleware from './protectRoute.middleware';

const mockJwtVerify = jest.fn();
jwt.verify = mockJwtVerify;

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();
const mockNextFunctionError = jest.fn();

const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  status: mockResponseStatus.mockReturnThis(),
};

const mockNextFunction: NextFunction = mockNextFunctionError;

describe('Protect Route Middleware', () => {
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

  describe('Admin Authorisation', () => {
    test('Expect to return 401 no token provided', async () => {
      const mockRequest: Partial<Request> = {
        headers: { authorization: '' },
      };

      // * Middleware: admin authorisation
      await protectRouteMiddleware.adminAuthorisation(
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
      mockJwtVerify.mockReturnValueOnce({ id: '41224d776a326fb40f000001', role: 'ADMIN' });

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserFixture as any).catch((error): void => console.log(error));

      // * Middleware: admin authorisation
      await protectRouteMiddleware.adminAuthorisation(
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
      mockJwtVerify.mockReturnValueOnce({ id: '41224d776a326fb40f000113', role: 'USER' });

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserFixture as any).catch((error): void => console.log(error));

      // * Middleware: admin authorisation
      await protectRouteMiddleware.adminAuthorisation(
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
      mockJwtVerify.mockReturnValueOnce({ id: '41224d776a326fb40f000003', role: 'ADMIN' });

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserAdminFixture as any).catch((error): void => console.log(error));

      // * Middleware: admin authorisation
      await protectRouteMiddleware.adminAuthorisation(
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
      await protectRouteMiddleware.userAuthorisation(
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
      mockJwtVerify.mockReturnValueOnce({ id: '41224d776a326fb40f000001', role: 'USER' });

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserFixture as any).catch((error): void => console.log(error));

      // * Middleware: user authorisation
      await protectRouteMiddleware.adminAuthorisation(
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
      mockJwtVerify.mockReturnValueOnce({ id: '41224d776a326fb40f000113', role: 'USER' });
      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * DB Service: add user as it is required for checkUserAuthorisation
      await usersDbService.addUser(postUserFixture as any).catch((error): void => console.log(error));

      // * Middleware: user authorisation
      await protectRouteMiddleware.userAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockNextFunction).toHaveBeenCalledWith();
    });
  });
});
