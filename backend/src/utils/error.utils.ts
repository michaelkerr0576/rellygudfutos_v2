import { Response } from 'express';

import * as cmn from '@/types/cmn';

const throw400Error = (response: Response): void => {
  response.status(400).json({ message: 'Bad Request' });
};

const throw401Error = (response: Response): void => {
  response.status(401).json({ message: 'User not authorized' });
};

const throw404Error = (response: Response, model: string): void => {
  response.status(404).json({ message: `${model} not found` });
};

const throw500Error = (
  response: Response,
  error: cmn.MongooseValidationError,
): void => {
  response.status(500).json({ ...error, message: 'Internal Server Error' });
};

const throwEmptyResultError = (response: Response, model: string): void => {
  response.status(404).json({ message: `${model} not found. Add ${model}` });
};

const throwValidationError = (
  response: Response,
  error: cmn.MongooseValidationError,
): void => {
  const errors = {} as cmn.ValidationErrorsMessage;

  Object.keys(error.errors).forEach((key): void => {
    errors[key] = {
      message: error.errors[key].message,
      /* @ts-expect-error: errors.key.kind does exist on MongooseValidationError */
      type: error.errors[key].kind,
    };
  });

  // eslint-disable-next-line no-underscore-dangle
  response.status(400).json({ message: error._message, errors });
};

const errorUtils = {
  throw400Error,
  throw401Error,
  throw404Error,
  throw500Error,
  throwEmptyResultError,
  throwValidationError,
};

export default errorUtils;
