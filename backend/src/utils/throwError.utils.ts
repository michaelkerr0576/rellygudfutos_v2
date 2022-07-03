import { Response } from 'express';

import * as cmn from '@/types/cmn.types';

const throw400Error = (response: Response): void => {
  response.status(400).json({ message: 'Bad Request' });
};

const throw401Error = (response: Response): void => {
  response.status(401).json({ message: 'User not authorized' });
};

const throw404Error = (response: Response, model: string): void => {
  response.status(404).json({ message: `${model} not found` });
};

const throw500Error = (response: Response, error: cmn.MongooseValidationError): void => {
  response.status(500).json({ ...error, message: 'Internal Server Error' });
};

const throwEmptyResultError = (response: Response, model: string): void => {
  response.status(404).json({ message: `${model} not found. Add ${model}` });
};

const throwValidationError = (response: Response, error: cmn.MongooseValidationError): void => {
  const { _message: message } = error;
  const errors = {} as cmn.ValidationErrorsMessage;

  Object.keys(error.errors).forEach((key): void => {
    errors[key] = {
      message: error.errors[key].message,
      /* @ts-expect-error: errors[key].kind does exist on MongooseValidationError */
      type: error.errors[key].kind,
    };
  });

  response.status(400).json({ message, errors });
};

const throwErrorUtils = {
  throw400Error,
  throw401Error,
  throw404Error,
  throw500Error,
  throwEmptyResultError,
  throwValidationError,
};

export default throwErrorUtils;
