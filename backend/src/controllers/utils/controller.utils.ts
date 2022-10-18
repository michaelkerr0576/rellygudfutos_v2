import { Response } from 'express';

import * as typDb from '@/ts/types/db.types';
import * as typError from '@/ts/types/error.types';
import errorMessageUtils from '@/utils/errorMessage.utils';
import generalUtils from '@/utils/general.utils';

const getPaginationQuery = (limit: string, maxLimit: number, page: string): typDb.PaginationQuery => {
  const pageNumber = generalUtils.stringToNumber(page);
  let limitNumber = generalUtils.stringToNumber(limit);
  limitNumber = limitNumber > maxLimit ? maxLimit : limitNumber;

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  return {
    endIndex,
    limit: limitNumber,
    page: pageNumber,
    startIndex,
  };
};

const getPaginationResponse = (
  endIndex: number,
  limit: number,
  page: number,
  startIndex: number,
  total: number,
): typDb.PaginatedResponse => {
  const pagination = {
    limit,
    page,
    pages: Math.ceil(total / limit),
    total,
  } as typDb.PaginatedResponse;

  if (startIndex > 0) {
    pagination.previous = {
      limit,
      page: page - 1,
    };
  }

  if (endIndex < total) {
    pagination.next = {
      limit,
      page: page + 1,
    };
  }

  return pagination;
};

const handleEmptyBodyRequest = (response: Response, model: string): Error => {
  response.status(400);
  const newError = new Error(errorMessageUtils.error400EmptyRequestBody(model));
  return newError;
};

const handleValidationError = (response: Response, error: typError.MongooseValidationError): void => {
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

export default {
  getPaginationQuery,
  getPaginationResponse,
  handleEmptyBodyRequest,
  handleValidationError,
};
