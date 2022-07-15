import { Document, model, Schema } from 'mongoose';

import * as enm from '@/types/enum.types';
import { regexUtils } from '@/utils';

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  name: string;
  password: string;
  role: enm.UserRole;
}

const userSchema = new Schema<IUser>(
  {
    _id: Schema.Types.ObjectId,
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
      match: regexUtils.password,
    },
    role: {
      type: String,
      enum: enm.UserRole,
      default: enm.UserRole.USER,
    },
  },
  { timestamps: true },
);

const User = model<IUser>('User', userSchema);

export default User;
