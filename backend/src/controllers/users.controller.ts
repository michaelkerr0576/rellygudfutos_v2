import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { LeanDocument, Types } from 'mongoose';

import UserModel from '@/models/User.model';
import usersDbService from '@/services/usersDb.service';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/error.types';
import { authUtils, errorMessageUtils } from '@/utils';

// * @desc Add user
// * @route POST /api/users
// * @access Private
const addUser = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { email, name, password, role } = request.body;

  const passwordSalt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, passwordSalt);

  const newUser = new UserModel({
    _id: new Types.ObjectId(),
    email,
    name,
    password: hashedPassword,
    role,
  });

  const handleUser = (user: inf.IUser): void => {
    response.status(201).json({
      addedUser: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: 'User added',
      token: authUtils.generateToken(user._id, user.role),
    });
  };

  const handleUserError = (error: typ.MongoError | typ.MongooseValidationError): void => {
    const isDuplicateUser = error.name === 'MongoError' && error.code === 11000;
    if (isDuplicateUser) {
      response.status(400);
      throw new Error(errorMessageUtils.error400AlreadyExists('User'));
    }

    const isValidationError = error.name === 'ValidationError';
    if (isValidationError) {
      const { message, errors } = errorMessageUtils.error400Validation(error as typ.MongooseValidationError);

      response.status(400);
      const newError = new Error(message);
      const validationError = Object.assign(newError, { errors });
      throw validationError;
    }

    throw error;
  };

  return usersDbService
    .addUser(newUser)
    .then((user): void => handleUser(user))
    .catch((error): void => handleUserError(error))
    .catch((error): void => next(error));
};

// * @desc Delete user
// * @route DELETE /api/users/:id
// * @access Private
const deleteUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah delete' });
};

// * @desc Get user
// * @route GET /api/users/:id
// * @access Private
const getUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah get user id' });
};

// * @desc Get users
// * @route GET /api/users
// * @access Private
const getUsers = (_request: Request, response: Response, next: NextFunction): Promise<void> => {
  const handleUsers = (users: LeanDocument<inf.IUser[]>): void => {
    const isUsersEmpty = users.length === 0;
    if (isUsersEmpty) {
      response.status(404);
      throw new Error(errorMessageUtils.error404EmptyResult('Users'));
    }

    response.status(200).json(users);
  };

  return usersDbService
    .getUsers()
    .then((users): void => handleUsers(users))
    .catch((error): void => next(error));
};

// * @desc Login user
// * @route POST /api/users/login
// * @access Public
const loginUser = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { email, password } = request.body;

  const handleUser = (user: LeanDocument<inf.IUser> | null): void => {
    if (!user) {
      response.status(404);
      throw new Error(errorMessageUtils.error404('User'));
    }

    const isInvalidPassword = !bcrypt.compareSync(password, user.password);
    if (isInvalidPassword) {
      response.status(404);
      throw new Error(errorMessageUtils.error404InvalidCredentials());
    }

    response.status(200).json({
      message: `${user.name} logged in`,
      token: authUtils.generateToken(user._id, user.role),
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  };

  return usersDbService
    .findUser(email)
    .then((user): void => handleUser(user))
    .catch((error): void => next(error));
};

// * @desc Update user
// * @route PUT /api/users/:id
// * @access Private
const updateUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah put' });
};

const usersController = {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
};

export default usersController;
