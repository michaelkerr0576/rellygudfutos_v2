import mongoose from 'mongoose';

export type MongooseValidationError = mongoose.Error.ValidationError & {
  _message: string;
};

export type ValidationErrorsMessage = {
  [name: string]: {
    message: string;
    type: string;
  };
};
