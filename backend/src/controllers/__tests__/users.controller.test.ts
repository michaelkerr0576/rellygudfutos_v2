import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import timekeeper from 'timekeeper';

import usersDbService from '@/services/usersDb.service';
import userMaxLengthFixture from '@/tests/fixtures/users/negative/userMaxLength.fixture';
import userIdFixture from '@/tests/fixtures/users/userId.fixture';
import userRequestFixture from '@/tests/fixtures/users/userRequest.fixture';
import userResponseFixture from '@/tests/fixtures/users/userResponse.fixture';
import usersResponseFixture from '@/tests/fixtures/users/usersResponse.fixture';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';
import usersScripts from '@/tests/scripts/users.scripts';

import usersController from '../users.controller';

const mockBcryptCompareSync = jest.fn();
bcrypt.compareSync = mockBcryptCompareSync;

const mockJwtSign = jest.fn();
jwt.sign = mockJwtSign;

const mockResponseStatus = jest.fn();
const mockResponseJson = jest.fn();

const mockResponse: Partial<Response> = {
  json: mockResponseJson,
  status: mockResponseStatus.mockReturnThis(),
};

const mockNextFunctionError = jest.fn();
const mockNextFunction: NextFunction = mockNextFunctionError;

describe('Users Controller', () => {
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

  describe('Add User', () => {
    test('Expect to return 401 no password provided', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
      };

      await usersController
        .addUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(401);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'No password provided',
        }),
      );
    });

    test('Expect to return 400 duplicate user', async () => {
      const mockRequest: Partial<Request> = {
        body: userRequestFixture,
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Controller: add duplicate user
      await usersController
        .addUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User already exists',
        }),
      );
    });

    test('Expect to return 400 user validation failed', async () => {
      const mockRequest: Partial<Request> = {
        body: userMaxLengthFixture,
      };

      await usersController
        .addUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User validation failed',
        }),
      );
    });

    test('Expect to return 201 user added', async () => {
      mockJwtSign.mockReturnValueOnce(utilFixture.token);

      const mockRequest: Partial<Request> = {
        body: userRequestFixture,
      };

      // * Controller: add user
      await usersController
        .addUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * DB Service: find user just added
      const addedUser = await usersDbService
        .getUser(userIdFixture)
        .catch((error): void => console.log(error));

      expect(addedUser).toBeTruthy();
      expect(addedUser).toEqual(userResponseFixture);

      // * Response
      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: userResponseFixture,
        message: 'User added',
        token: utilFixture.token,
      });
    });
  });

  describe('Delete User', () => {
    test('Expect to return 404 user not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: userRequestFixture._id },
      };

      await usersController
        .deleteUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not found',
        }),
      );
    });

    test('Expect to return 200 user deleted', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: userRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Controller: delete user
      await usersController
        .deleteUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * DB Service: expect to not find user just deleted
      const deletedUser = await usersDbService
        .findUser(userRequestFixture.email)
        .catch((error): void => console.log(error));

      expect(deletedUser).not.toBeTruthy();

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: userResponseFixture,
        message: 'User deleted',
      });
    });
  });

  describe('Get User', () => {
    test('Expect to return 404 user not found', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: userRequestFixture._id },
      };

      await usersController
        .getUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not found',
        }),
      );
    });

    test('Expect to return 200 get user', async () => {
      const mockRequest: Partial<Request> = {
        params: { id: userRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Controller: get user
      await usersController
        .getUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: userResponseFixture,
        message: 'User fetched successfully',
      });
    });
  });

  describe('Get Users', () => {
    // TODO - add query to test
    test('Expect to return 404 users not found', async () => {
      const mockRequest: Partial<Request> = {
        query: {},
      };

      await usersController
        .getUsers(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Users not found. Add Users',
        }),
      );
    });

    test('Expect to return 200 get users default pagination', async () => {
      const mockRequest: Partial<Request> = {
        query: {},
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUsersData();

      // * Controller: get users
      await usersController
        .getUsers(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: usersResponseFixture,
        message: 'Users fetched successfully',
        pagination: {
          limit: 50,
          page: 1,
          pages: 1,
          total: 3,
        },
      });
    });
  });

  describe('Login User', () => {
    test('Expect to return 404 user not found', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
      };

      await usersController
        .loginUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not found',
        }),
      );
    });

    test('Expect to return 404 invalid credentials', async () => {
      const mockRequest: Partial<Request> = {
        body: {
          email: userResponseFixture.email,
          password: '123123',
        },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Controller: login user
      await usersController
        .loginUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid credentials',
        }),
      );
    });

    test('Expect to return 200 user logged in', async () => {
      mockBcryptCompareSync.mockReturnValueOnce(true);
      mockJwtSign.mockReturnValueOnce(utilFixture.token);

      const mockRequest: Partial<Request> = {
        body: {
          email: userResponseFixture.email,
          password: userRequestFixture.password,
        },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Controller: login user
      await usersController
        .loginUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: { ...userResponseFixture, password: '********' },
        message: 'Dr. Brad Pitt logged in',
        token: utilFixture.token,
      });
    });
  });

  describe('Update User', () => {
    test('Expect to return 400 empty request body', async () => {
      const mockRequest: Partial<Request> = {
        body: {},
        params: { id: userRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Controller: update user
      await usersController
        .updateUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Empty User request body',
        }),
      );
    });

    test('Expect to return 400 user validation failed', async () => {
      const mockRequest: Partial<Request> = {
        body: {
          ...userRequestFixture,
          name: userMaxLengthFixture.name,
        },
        params: { id: userRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Controller: update user
      await usersController
        .updateUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * Response
      expect(mockResponse.status).toBeCalledWith(400);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Validation failed',
        }),
      );
    });

    test('Expect to return 404 user not found', async () => {
      const mockRequest: Partial<Request> = {
        body: userRequestFixture,
        params: { id: userRequestFixture._id },
      };

      await usersController
        .updateUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      expect(mockResponse.status).toBeCalledWith(404);
      expect(mockNextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User not found',
        }),
      );
    });

    test('Expect to return 200 user updated', async () => {
      const mockRequest: Partial<Request> = {
        body: {
          ...userRequestFixture,
          name: 'test updated user',
        },
        params: { id: userRequestFixture._id },
      };

      // * Script: populate memory server with test data
      await usersScripts.prepUserData();

      // * Controller: update user
      await usersController
        .updateUser(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)
        .catch((error): void => mockNextFunction(error));

      // * DB Service: find user just updated
      const addedUser = await usersDbService
        .getUser(userRequestFixture._id)
        .catch((error): void => console.log(error));

      expect(addedUser).toBeTruthy();
      expect(addedUser).toEqual({
        ...userResponseFixture,
        name: 'test updated user',
      });

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: { ...userResponseFixture, name: 'test updated user' },
        message: 'User updated',
      });
    });
  });
});
