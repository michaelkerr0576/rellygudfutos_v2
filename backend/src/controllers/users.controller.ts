import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

import UserModel from '@/models/User.model';
import usersDbService from '@/services/usersDb.service';
import errorMessageUtils from '@/utils/errorMessage.utils';

import controllerUtils from './utils/controller.utils';
import userControllerUtils from './utils/usersController.utils';

// * @desc Add user
// * @route POST /api/users
// * @access Private
const addUser = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    body: { password },
    body,
  } = request;

  if (!password) {
    response.status(401);
    const newError = new Error(errorMessageUtils.error401NoPassword());
    return Promise.resolve(next(newError));
  }

  const passwordSalt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, passwordSalt);

  const newUser = new UserModel({
    _id: new Types.ObjectId(),
    ...body,
    password: hashedPassword,
  });

  return usersDbService
    .addUser(newUser)
    .then((user): Promise<void> => userControllerUtils.handleAddedUser(response, user))
    .catch((error): void => controllerUtils.handleDuplicateError(response, error, 'User'))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): void => next(error));
};

// * @desc Delete user
// * @route DELETE /api/users/:id
// * @access Private
const deleteUser = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return usersDbService
    .deleteUser(id)
    .then((user): Promise<void> => userControllerUtils.handleDeletedUser(response, user))
    .catch((error): void => next(error));
};

// * @desc Get user
// * @route GET /api/users/:id
// * @access Private
const getUser = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return usersDbService
    .getUser(id)
    .then((user): Promise<void> => userControllerUtils.handleUser(response, user))
    .catch((error): void => next(error));
};

// * @desc Get users
// * @route GET /api/users
// * @access Private
const getUsers = (_request: Request, response: Response, next: NextFunction): Promise<void> =>
  usersDbService
    .getUsers()
    .then((users): Promise<void> => userControllerUtils.handleUsers(response, users))
    .catch((error): void => next(error));

// * @desc Login user
// * @route POST /api/users/login
// * @access Public
const loginUser = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { email, password } = request.body;

  return usersDbService
    .findUser(email)
    .then((user): Promise<void> => userControllerUtils.handleLoggedInUser(response, user, password))
    .catch((error): void => next(error));
};

// * @desc Update user
// * @route PUT /api/users/:id
// * @access Private
const updateUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah put' });
};

export default {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
};
