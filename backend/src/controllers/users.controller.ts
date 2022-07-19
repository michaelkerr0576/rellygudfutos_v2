import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import UserModel, { IUser } from '@/models/User.model';
import usersDbService from '@/services/usersDb.service';
import * as cmn from '@/types/cmn.types';
import { throwErrorUtils } from '@/utils';

// * @desc Add user
// * @route POST /api/users
// * @access Private
const addUser = (request: Request, response: Response): Promise<void> => {
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

  const handleResult = (result: IUser): void => {
    if (!result) {
      throwErrorUtils.throw400Error(response);
      return;
    }

    response.status(201).json({
      message: 'User added',
      addedUser: {
        _id: result._id,
        email: result.email,
        name: result.name,
        role: result.role,
      },
    });
  };

  const handleError = (error: cmn.MongoError | cmn.MongooseValidationError): void => {
    const isDuplicateUser = error.name === 'MongoError' && error.code === 11000;
    if (isDuplicateUser) {
      throwErrorUtils.throwAlreadyExistsError(response, 'User', error as cmn.MongoError);
      return;
    }

    const isValidationError = error.name === 'ValidationError';
    if (isValidationError) {
      throwErrorUtils.throwValidationError(response, error as cmn.MongooseValidationError);
      return;
    }

    throwErrorUtils.throw500Error(response, error);
  };

  return usersDbService
    .addUser(newUser)
    .then((result): void => handleResult(result))
    .catch((error): void => handleError(error));
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
const getUsers = (_request: Request, response: Response): Promise<void> => {
  const handleResult = (result: IUser[]): void => {
    if (!result) {
      throwErrorUtils.throw400Error(response);
      return;
    }

    const isEmptyResult = result.length === 0;
    if (isEmptyResult) {
      throwErrorUtils.throwEmptyResultError(response, 'Users');
      return;
    }

    response.status(200).json(result);
  };

  return usersDbService
    .getUsers()
    .then((result): void => handleResult(result))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// * @desc Login user
// * @route POST /api/users/login
// * @access Public
const loginUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah post' });
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
