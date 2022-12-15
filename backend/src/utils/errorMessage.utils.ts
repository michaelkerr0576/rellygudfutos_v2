import * as typ from '@/ts/types/error.types';

/* 
 $ errorMessageUtils
  - error400
  - error400AlreadyExists
  - error400EmptyRequestBody
  - error400InvalidFileType
  - error400Required
  - error400Validation
  - error401
  - error401NoPassword
  - error401NoToken
  - error401SessionExpired
  - error404
  - error404ArrayValueNotFound
  - error404EmptyResult
  - error404EmptyResultFilter
  - error404InvalidCredentials
  - error500
  - error500NotFound
*/

export const error400 = (): string => 'Bad Request';

export const error400AlreadyExists = (model: string): string => `${model} already exists`;

export const error400EmptyRequestBody = (model: string): string => `Empty ${model} request body`;

export const error400InvalidFileType = (fileTypes: string): string =>
  `Only ${fileTypes} file types are allowed`;

export const error400Required = (model: string): string => `${model} is required`;

export const error400Validation = (
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

export const error401 = (): string => 'User not authorized';

export const error401NoPassword = (): string => 'No password provided';

export const error401NoToken = (): string => 'No token provided';

export const error401SessionExpired = (): string => 'Session has expired';

export const error404 = (model: string): string => `${model} not found`;

export const error404ArrayValueNotFound = (model: string, array: string): string =>
  `${model} not found from ${array}`;

export const error404EmptyResult = (model: string): string => `${model} not found. Add ${model}`;

export const error404EmptyResultFilter = (model: string): string =>
  `${model} not found. Remove filter or add ${model}`;

export const error404InvalidCredentials = (): string => 'Invalid credentials';

export const error500 = (): string => 'Internal Server Error';

export const error500NotFound = (model: string): string => `Cannot find ${model} just added`;
