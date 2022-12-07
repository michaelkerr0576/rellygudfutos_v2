import { NextFunction, Request, Response } from 'express';

import * as typ from '@/ts/types/error.types';

const nodeEnv = process.env.NODE_ENV || 'development';

const errorHandler = (
  error: typ.MongooseValidationError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  // * Changing Express default error status code from 200 to 500
  const statusCode = response.statusCode && response.statusCode !== 200 ? response.statusCode : 500;

  response.status(statusCode);
  response.json({
    errors: error.errors,
    message: error.message,
    stack: nodeEnv === 'production' ? undefined : error.stack,
  });
};

export default errorHandler;
