import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IUser } from '@/models/User.model';
import usersDbService from '@/services/usersDb.service';
import * as enm from '@/types/enum.types';
import { throwErrorUtils } from '@/utils';

interface JwtPayload {
  id: string;
  role: string;
}

const jwtSecret = process.env.JWT_SECRET || '';

const authenticateUser = (
  request: Request,
  response: Response,
  next: NextFunction,
  roles: enm.UserRole[],
): void => {
  const token =
    request.headers.authorization && request.headers.authorization.startsWith('Bearer')
      ? request.headers.authorization.split(' ')[1]
      : undefined;

  if (token) {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    const checkUserAuthentication = (user: IUser | null): void => {
      if (!user) {
        throwErrorUtils.throw404Error(response, 'User');
        return;
      }

      const isUserAuthorised = roles.includes(user.role);
      if (!isUserAuthorised) {
        throwErrorUtils.throw401Error(response);
        return;
      }

      next();
    };

    usersDbService
      .getUser(decoded.id)
      .then((user): void => checkUserAuthentication(user))
      .catch((error): void => throwErrorUtils.throw500Error(response, error));
  } else {
    throwErrorUtils.throw401Error(response);
  }
};

const adminAuthorisation = (request: Request, response: Response, next: NextFunction): void => {
  authenticateUser(request, response, next, [enm.UserRole.ADMIN]);
};

const userAuthorisation = (request: Request, response: Response, next: NextFunction): void => {
  authenticateUser(request, response, next, [enm.UserRole.ADMIN, enm.UserRole.USER]);
};

const protectRoute = {
  adminAuthorisation,
  userAuthorisation,
};

export default protectRoute;
