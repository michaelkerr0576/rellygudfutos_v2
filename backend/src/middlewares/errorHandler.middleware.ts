import { NextFunction, Request, Response } from 'express';

const nodeEnv = process.env.NODE_ENV || 'development';

const errorHandler = (error: Error, _request: Request, response: Response, _next: NextFunction): void => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  response.status(statusCode);
  response.json({
    message: error.message,
    stack: nodeEnv === 'production' ? undefined : error.stack,
  });
};

export default errorHandler;
