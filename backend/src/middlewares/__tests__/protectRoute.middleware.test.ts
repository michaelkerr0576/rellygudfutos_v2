import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import timekeeper from 'timekeeper';

import userAdminFixture from '@/tests/fixtures/users/userAdminRequest.fixture';
import userFixture from '@/tests/fixtures/users/userRequest.fixture';
import * as utilFixture from '@/tests/fixtures/util.fixture';
import * as mongoMemoryServer from '@/tests/mongoMemoryServer';
import * as usersScripts from '@/tests/scripts/users.scripts';

import * as protectRouteMiddleware from '../protectRoute.middleware';

const actualJwtVerify = jest.requireActual('jsonwebtoken').verify;
const mockJwtVerify = jest.fn();
jwt.verify = mockJwtVerify;

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();
const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  locals: {},
  status: mockResponseStatus.mockReturnThis(),
};

const mockNextFunctionError = jest.fn();
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

    test('Expect to return 401 session expired', async () => {
      mockJwtVerify.mockImplementation(actualJwtVerify);

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      await protectRouteMiddleware.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockResponse.status).toBeCalledWith(401);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Session has expired',
        }),
      );
    });

    test('Expect to return 404 user not found', async () => {
      mockJwtVerify.mockReturnValueOnce({ id: '41224d776a326fb40f000001', role: userAdminFixture.role });

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepAdminUserData();

      // * Middleware: admin authorisation
      await protectRouteMiddleware.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      // * Response
      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not found',
        }),
      );
    });

    test('Expect to return 401 user not authorized', async () => {
      mockJwtVerify.mockReturnValueOnce({ id: userFixture._id, role: userFixture.role });

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Middleware: admin authorisation
      await protectRouteMiddleware.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      // * Response
      expect(mockResponse.status).toBeCalledWith(401);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not authorized',
        }),
      );
    });

    test('Expect user authorized and go to next function with user ID set in response locals', async () => {
      mockJwtVerify.mockReturnValueOnce({ id: userAdminFixture._id, role: userAdminFixture.role });

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepAdminUserData();

      // * Middleware: admin authorisation
      await protectRouteMiddleware.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      // * Response
      expect(mockResponse.locals).toEqual({ user: { _id: Types.ObjectId(userAdminFixture._id) } });
      expect(mockNextFunction).toHaveBeenCalledWith();
    });
  });

  describe('User Authorisation', () => {
    test('Expect to return 401 no token provided', async () => {
      const mockRequest: Partial<Request> = {
        headers: { authorization: '' },
      };

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

    test('Expect to return 401 session expired', async () => {
      mockJwtVerify.mockImplementation(actualJwtVerify);

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      await protectRouteMiddleware.userAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      expect(mockResponse.status).toBeCalledWith(401);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Session has expired',
        }),
      );
    });

    test('Expect to return 404 user not found', async () => {
      mockJwtVerify.mockReturnValueOnce({ id: '41224d776a326fb40f000001', role: userFixture.role });

      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Middleware: user authorisation
      await protectRouteMiddleware.adminAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      // * Response
      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not found',
        }),
      );
    });

    test('Expect user authorized and go to next function with user ID set in response locals', async () => {
      mockJwtVerify.mockReturnValueOnce({ id: userFixture._id, role: userFixture.role });
      const mockRequest: Partial<Request> = {
        headers: { authorization: utilFixture.bearerToken },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Middleware: user authorisation
      await protectRouteMiddleware.userAuthorisation(
        mockRequest as Request,
        mockResponse as Response,
        mockNextFunction as NextFunction,
      );

      // * Response
      expect(mockResponse.locals).toEqual({ user: { _id: Types.ObjectId(userFixture._id) } });
      expect(mockNextFunction).toHaveBeenCalledWith();
    });
  });
});
