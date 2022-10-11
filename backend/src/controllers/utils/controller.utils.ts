import { Response } from 'express';

import * as typ from '@/ts/types/error.types';
import { errorMessageUtils } from '@/utils';

const handleEmptyBodyRequest = (response: Response, model: string): Error => {
  response.status(400);
  const newError = new Error(errorMessageUtils.error400EmptyRequestBody(model));
  return newError;
};

const handleValidationError = (response: Response, error: typ.MongooseValidationError): void => {
  const isValidationError = error.name === 'ValidationError';
  if (isValidationError) {
    const { message, errors } = errorMessageUtils.error400Validation(error);

    response.status(400);
    let newError = new Error(message);
    newError = Object.assign(newError, { errors });
    throw newError;
  }

  throw error;
};

const controllerUtils = {
  handleEmptyBodyRequest,
  handleValidationError,
};

export default controllerUtils;
