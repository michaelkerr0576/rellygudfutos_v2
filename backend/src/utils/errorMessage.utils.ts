import * as typ from '@/ts/types/error.types';

const error400 = (): string => 'Bad Request';

const error400AlreadyExists = (model: string): string => `${model} already exists`;

const error400EmptyRequestBody = (model: string): string => `Empty ${model} request body`;

const error400Validation = (
  error: typ.MongooseValidationError,
): { message: string; errors: typ.ValidationErrorsMessage } => {
  const { _message: message } = error;
  const errors = {} as typ.ValidationErrorsMessage;

  Object.keys(error.errors).forEach((key): void => {
    errors[key] = {
      message: error.errors[key].message,
      /* @ts-expect-error: errors[key].kind does exist on MongooseValidationError */
      type: error.errors[key].kind,
    };
  });

  return { errors, message };
};

const error401 = (): string => 'User not authorized';

const error401NoToken = (): string => 'No token provided';

const error401SessionExpired = (): string => 'Session has expired';

const error404 = (model: string): string => `${model} not found`;

const error404ArrayValueNotFound = (model: string, array: string): string =>
  `${model} not found from ${array}`;

const error404EmptyResult = (model: string): string => `${model} not found. Add ${model}`;

const error404EmptyResultFilter = (model: string): string =>
  `${model} not found. Remove filter or add ${model}`;

const error404InvalidCredentials = (): string => 'Invalid credentials';

const error500 = (): string => 'Internal Server Error';

const error500NotFound = (model: string): string => `Cannot find ${model} just added`;

export default {
  error400,
  error400AlreadyExists,
  error400EmptyRequestBody,
  error400Validation,
  error401,
  error401NoToken,
  error401SessionExpired,
  error404,
  error404ArrayValueNotFound,
  error404EmptyResult,
  error404EmptyResultFilter,
  error404InvalidCredentials,
  error500,
  error500NotFound,
};
