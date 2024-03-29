import mongoose from 'mongoose';

export type MongoError = Error & {
  code: number;
  driver: boolean;
  index: number;
  keyPattern: any;
  keyValue: any;
};

export type MongooseValidationError = mongoose.Error.ValidationError & {
  _message: string;
};

export type ValidationErrorsMessage = {
  [name: string]: {
    message: string;
    type: string;
  };
};
