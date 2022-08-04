import mongoose from 'mongoose';

import * as enm from './enum.types';

// #region Error Types
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
// #endregion

export type OperationStatus = { status: enm.OperationStatus };
