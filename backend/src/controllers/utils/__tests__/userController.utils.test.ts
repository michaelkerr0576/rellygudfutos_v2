import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import timekeeper from 'timekeeper';

import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';
import usersScripts from '@/tests/scripts/users.scripts';

import usersControllerUtils from '../usersController.utils';

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

describe('Users Controller Utils', () => {
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

  describe('Handle Added User', () => {
    test('Expect to return 500 server error if user that was added can not be found', async () => {
      const user = null;

      await expect(usersControllerUtils.handleAddedUser(mockResponse as Response, user)).rejects.toThrow(
        'Cannot find User just added',
      );

      expect(mockResponse.status).toBeCalledWith(500);
    });

    test('Expect to return 201 user added', async () => {
      mockJwtSign.mockReturnValueOnce(utilFixture.token);

      const user = { test: 'test' } as any;

      await usersControllerUtils.handleAddedUser(mockResponse as Response, user);

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: user,
        message: 'User added',
        token: utilFixture.token,
      });
    });
  });

  describe('Handle Logged In User', () => {
    test('Expect to return 404 user not found', async () => {
      const user = null;
      const password = '';

      await expect(
        usersControllerUtils.handleLoggedInUser(mockResponse as Response, user, password),
      ).rejects.toThrow('User not found');

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 404 invalid credentials', async () => {
      mockBcryptCompareSync.mockReturnValueOnce(false);
      mockJwtSign.mockReturnValueOnce(utilFixture.token);

      const user = { name: 'test' } as any;
      const password = '';

      await expect(
        usersControllerUtils.handleLoggedInUser(mockResponse as Response, user, password),
      ).rejects.toThrow('Invalid credentials');

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 user logged in', async () => {
      mockBcryptCompareSync.mockReturnValueOnce(true);
      mockJwtSign.mockReturnValueOnce(utilFixture.token);

      const user = { name: 'test' } as any;
      const password = '';

      await usersControllerUtils.handleLoggedInUser(mockResponse as Response, user, password);

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: { ...user, password: '********' },
        message: 'test logged in',
        token: utilFixture.token,
      });
    });
  });

  describe('Handle User', () => {
    test('Expect to return 404 user not found', async () => {
      const user = null;

      await expect(usersControllerUtils.handleUser(mockResponse as Response, user)).rejects.toThrow(
        'User not found',
      );

      expect(mockResponse.status).toBeCalledWith(404);
    });

    test('Expect to return 200 get user', async () => {
      const user = { name: 'test' } as any;

      await usersControllerUtils.handleUser(mockResponse as Response, user);

      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: user,
        message: 'User fetched successfully',
      });
    });
  });

  describe('Handle Users', () => {
    // TODO - add query to test
    test('Expect to return 404 users not found', async () => {
      const users = [] as any;
      // const query = {} as any;

      await expect(usersControllerUtils.handleUsers(mockResponse as Response, users)).rejects.toThrow(
        'Users not found. Add Users',
      );

      expect(mockResponse.status).toBeCalledWith(404);
    });

    // TODO - add pagination to test
    test('Expect to return 200 get users pagination page two, next and previous', async () => {
      const users = [{ test: 'test' }] as any;
      // const query = { endIndex: 2, limit: 1, page: 2, startIndex: 1 } as any;

      // * Script: populate memory server with test data
      await usersScripts.prepUsersData();

      // * Controller Utils: handle users
      await usersControllerUtils.handleUsers(mockResponse as Response, users);

      // * Response
      expect(mockResponse.status).toBeCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: users,
        message: 'Users fetched successfully',
        // pagination: {
        //   limit: 1,
        //   next: { limit: 1, page: 3 },
        //   page: 2,
        //   pages: 3,
        //   previous: { limit: 1, page: 1 },
        //   total: 3,
        // },
      });
    });
  });
});
