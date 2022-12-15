/* eslint-disable sort-keys */
import { model, Schema, Types } from 'mongoose';

import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as regexUtils from '@/utils/regex.utils';

import * as validateUtils from './utils/validate.utils';
import * as validateMessageUtils from './utils/validateMessage.utils';

const userSchema = new Schema<inf.IUser>(
  {
    _id: Types.ObjectId,
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxLength: 100,
      match: regexUtils.emailAddress,
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
      match: regexUtils.personName,
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

const User = model<inf.IUser>('User', userSchema);

export default User;
