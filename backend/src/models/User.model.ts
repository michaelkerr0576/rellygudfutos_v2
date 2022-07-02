import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    _id: Schema.Types.ObjectId,
    email: {
      maxLength: 100,
      required: true,
      trim: true,
      type: String,
      unique: true,
      // * Regex: valid email address - test@email.com
      validate:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      maxLength: 100,
      required: true,
      type: String,
      // * Regex: secure password - minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
      validate:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
  },
  { timestamps: true },
);

const User = model<IUser>('User', userSchema);

export default User;
