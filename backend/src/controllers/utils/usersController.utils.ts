import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { LeanDocument } from 'mongoose';

import usersDbService from '@/services/usersDb.service';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';
import authUtils from '@/utils/auth.utils';
import * as con from '@/utils/constants/pagination';
import errorMessageUtils from '@/utils/errorMessage.utils';
import responseMessageUtils from '@/utils/responseMessage.utils';

import controllerUtils from './controller.utils';

const getUsersQuery = (query: Request['query']): typ.PaginationQuery => {
  const { limit = con.USER_LIMIT, page = con.PAGE } = query;

  const pagination = controllerUtils.getPaginationQuery(
    limit as string | number,
    con.USER_MAX_LIMIT,
    page as string | number,
  );

  return {
    endIndex: pagination.endIndex,
    limit: pagination.limit,
    page: pagination.page,
    startIndex: pagination.startIndex,
  };
};

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

const handleUpdatedUser = async (response: Response, user: LeanDocument<inf.IUser> | null): Promise<void> => {
  if (!user) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('User'));
  }

  response.status(200).json({
    data: user,
    message: responseMessageUtils.dataUpdated('User'),
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

const handleUsers = async (
  response: Response,
  users: LeanDocument<inf.IUser[]>,
  usersQuery: typ.PaginationQuery,
): Promise<void> => {
  const isUsersEmpty = users.length === 0;
  if (isUsersEmpty) {
    response.status(404);
    throw new Error(errorMessageUtils.error404EmptyResult('Users'));
  }

  const { startIndex, page, limit, endIndex } = usersQuery;

  const total = await usersDbService.countUsers();
  const pagination = controllerUtils.getPaginationResponse(endIndex, limit, page, startIndex, total);

  response.status(200).json({
    data: users,
    message: responseMessageUtils.dataFetched('Users'),
    pagination,
  });
};

export default {
  getUsersQuery,
  handleAddedUser,
  handleDeletedUser,
  handleLoggedInUser,
  handleUpdatedUser,
  handleUser,
  handleUsers,
};
