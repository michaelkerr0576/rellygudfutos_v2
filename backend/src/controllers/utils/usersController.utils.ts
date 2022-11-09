import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { LeanDocument } from 'mongoose';

import * as inf from '@/ts/interfaces/db.interface';
import authUtils from '@/utils/auth.utils';
import errorMessageUtils from '@/utils/errorMessage.utils';
import responseMessageUtils from '@/utils/responseMessage.utils';

const handleAddedUser = async (response: Response, user: LeanDocument<inf.IUser> | null): Promise<void> => {
  if (!user) {
    response.status(500);
    throw new Error(errorMessageUtils.error500NotFound('User'));
  }

  const { _id: userId, role: userRole } = user;

  response.status(201).json({
    data: user,
    message: responseMessageUtils.dataAdded('User'),
    token: authUtils.generateToken(userId, userRole),
  });
};

const handleDeletedUser = async (response: Response, user: LeanDocument<inf.IUser> | null): Promise<void> => {
  if (!user) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('User'));
  }

  response.status(200).json({
    data: user,
    message: responseMessageUtils.dataDeleted('User'),
  });
};

const handleLoggedInUser = async (
  response: Response,
  user: LeanDocument<inf.IUser> | null,
  typedPassword: string,
): Promise<void> => {
  if (!user) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('User'));
  }

  const { _id: userId, name: username, password: userPassword, role: userRole } = user;

  const isInvalidPassword = !bcrypt.compareSync(typedPassword, userPassword);
  if (isInvalidPassword) {
    response.status(404);
    throw new Error(errorMessageUtils.error404InvalidCredentials());
  }

  const userResponse = {
    ...user,
    password: '********',
  };

  response.status(200).json({
    data: userResponse,
    message: responseMessageUtils.userLoggedIn(username),
    token: authUtils.generateToken(userId, userRole),
  });
};

const handleUser = async (response: Response, user: LeanDocument<inf.IUser> | null): Promise<void> => {
  if (!user) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('User'));
  }

  response.status(200).json({
    data: user,
    message: responseMessageUtils.dataFetched('User'),
  });
};

const handleUsers = async (response: Response, users: LeanDocument<inf.IUser[]>): Promise<void> => {
  const isUsersEmpty = users.length === 0;
  if (isUsersEmpty) {
    response.status(404);
    throw new Error(errorMessageUtils.error404EmptyResult('Users'));
  }

  response.status(200).json({
    data: users,
    message: responseMessageUtils.dataFetched('Users'),
  });
};

export default {
  handleAddedUser,
  handleDeletedUser,
  handleLoggedInUser,
  handleUser,
  handleUsers,
};
