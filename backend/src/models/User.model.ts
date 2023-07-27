/* eslint-disable sort-keys */
import { model, Schema, Types } from 'mongoose';

import * as con from '@/constants/regex.constants';
import * as enm from '@/types/enums/db.enum';
import * as inf from '@/types/interfaces/db.interface';

import * as validateUtils from './utils/validate.utils';
import * as validateMessageUtils from './utils/validateMessage.utils';

const userSchema = new Schema<inf.User>(
  {
    _id: Types.ObjectId,
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxLength: 100,
      match: con.EMAIL_ADDRESS_REGEX,
    },
    equipment: {
      cameras: {
        type: [String],
        // * Validate: required | maxLength - validate needed for array
        validate: [
          {
            validator: validateUtils.arrayValuesRequired,
            message: validateMessageUtils.requiredMessage,
          },
          {
            validator: validateUtils.arrayValuesMaxLength(100),
            message: validateMessageUtils.maxLengthMessage(100),
          },
        ],
      },
      lenses: {
        type: [String],
        // * Validate: required | maxLength - validate needed for array
        validate: [
          {
            validator: validateUtils.arrayValuesRequired,
            message: validateMessageUtils.requiredMessage,
          },
          {
            validator: validateUtils.arrayValuesMaxLength(100),
            message: validateMessageUtils.maxLengthMessage(100),
          },
        ],
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
      match: con.PERSON_NAME_REGEX,
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
    },
    photos: [
      {
        type: Types.ObjectId,
        ref: 'Photo',
      },
    ],
    role: {
      type: String,
      enum: enm.UserRole,
      default: enm.UserRole.USER,
    },
  },
  { timestamps: true },
);

const User = model<inf.User>('User', userSchema);

export default User;
