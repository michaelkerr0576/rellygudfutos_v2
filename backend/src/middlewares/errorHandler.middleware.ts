import { NextFunction, Request, Response } from 'express';

import * as cmn from '@/types/cmn.types';

const nodeEnv = process.env.NODE_ENV || 'development';

const errorHandler = (
  error: cmn.MongooseValidationError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  response.status(statusCode);
  response.json({
    errors: error.errors,
    message: error.message,
    stack: nodeEnv === 'production' ? undefined : error.stack,
  });
};

export default errorHandler;
