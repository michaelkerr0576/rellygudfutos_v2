/* eslint-disable sort-keys */
import { model, Schema, Types } from 'mongoose';

import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import regexUtils from '@/utils/regex.utils';

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
