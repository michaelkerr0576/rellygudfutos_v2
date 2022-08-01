import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { LeanDocument, Types } from 'mongoose';

import UserModel, { IUser } from '@/models/User.model';
import usersDbService from '@/services/usersDb.service';
import * as cmn from '@/types/cmn.types';
import { authUtils, throwErrorUtils } from '@/utils';

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

  const handleUser = (user: IUser): void => {
    response.status(201).json({
      message: 'User added',
      addedUser: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: authUtils.generateToken(user._id, user.role),
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
    .then((user): void => handleUser(user))
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
  const handleUsers = (users: LeanDocument<IUser[]>): void => {
    const isUsersEmpty = users.length === 0;
    if (isUsersEmpty) {
      throwErrorUtils.throwEmptyResultError(response, 'Users');
      return;
    }

    response.status(200).json(users);
  };

  return usersDbService
    .getUsers()
    .then((users): void => handleUsers(users))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// * @desc Login user
// * @route POST /api/users/login
// * @access Public
const loginUser = (request: Request, response: Response): Promise<void> => {
  const { email, password } = request.body;

  const handleUser = (user: LeanDocument<IUser> | null): void => {
    if (!user) {
      throwErrorUtils.throw404Error(response, 'User');
      return;
    }

    const isInvalidPassword = !bcrypt.compareSync(password, user.password);
    if (isInvalidPassword) {
      throwErrorUtils.throwInvalidCredentialsError(response);
      return;
    }

    response.status(200).json({
      message: `${user.name} logged in`,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: authUtils.generateToken(user._id, user.role),
    });
  };

  return usersDbService
    .findUser(email)
    .then((user): void => handleUser(user))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
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
