import express, { NextFunction } from 'express';

const errorHandler = (
  error: Error,
  _request: express.Request,
  response: express.Response,
  _next: NextFunction,
): void => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  response.status(statusCode);
  response.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

export default errorHandler;
