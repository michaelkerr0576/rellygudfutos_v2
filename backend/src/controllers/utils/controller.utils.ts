import { Response } from 'express';

import * as cmn from '@/types/cmn.types';
import { errorMessageUtils } from '@/utils';

const handleEmptyBodyRequest = (response: Response): Error => {
  response.status(400);
  const newError = new Error(errorMessageUtils.error400EmptyRequestBody('Photo'));
  return newError;
};

const handleValidationError = (response: Response, error: cmn.MongooseValidationError): void => {
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
