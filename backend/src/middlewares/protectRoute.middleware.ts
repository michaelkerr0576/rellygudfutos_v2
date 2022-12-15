import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LeanDocument, Types } from 'mongoose';

import * as usersDbService from '@/services/usersDb.service';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as errorMessageUtils from '@/utils/errorMessage.utils';

/* 
 $ protectRouteMiddleware
  - adminAuthorisation
  - userAuthorisation
*/

interface JwtPayload {
  id: Types.ObjectId;
  role: string;
}

const jwtSecret = process.env.JWT_SECRET || '';

const authenticateUser = (
  request: Request,
  response: Response,
  next: NextFunction,
  roles: enm.UserRole[],
): Promise<void> => {
  const token =
    request.headers.authorization && request.headers.authorization.startsWith('Bearer')
      ? request.headers.authorization.split(' ')[1]
      : undefined;

  if (!token) {
    response.status(401);
    const newError = new Error(errorMessageUtils.error401NoToken());
    return Promise.resolve(next(newError));
  }

  const decodedToken = jwt.verify(token, jwtSecret, (error, decoded): Promise<void | JwtPayload> => {
    if (error) {
      response.status(401);
      const newError = new Error(errorMessageUtils.error401SessionExpired());
      return Promise.resolve(next(newError));
    }

    return decoded as Promise<JwtPayload>;
  }) as unknown as JwtPayload;

  const checkUserAuthentication = (user: LeanDocument<inf.IUser> | null): void => {
    if (!user) {
      response.status(404);
      throw new Error(errorMessageUtils.error404('User'));
    }

    const isUserAuthorised = roles.includes(user.role);
    if (!isUserAuthorised) {
      response.status(401);
      throw new Error(errorMessageUtils.error401());
    }

    response.locals.user = { _id: user._id };
    next();
  };

  return usersDbService
    .getUser(decodedToken.id)
    .then((user): void => checkUserAuthentication(user))
    .catch((error): void => next(error));
};

export const adminAuthorisation = (request: Request, response: Response, next: NextFunction): Promise<void> =>
  authenticateUser(request, response, next, [enm.UserRole.ADMIN]);

export const userAuthorisation = (request: Request, response: Response, next: NextFunction): Promise<void> =>
  authenticateUser(request, response, next, [enm.UserRole.ADMIN, enm.UserRole.USER]);
