import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  name: string;
  password: string;
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
      // * Regex: valid email address - test@email.com
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
      // * Regex: no support for special characters or numbers - Martin Luther King, Jr.
      match: /^[a-z ,.'-]+$/i,
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
      // * Regex: secure password - minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
  },
  { timestamps: true },
);

const User = model<IUser>('User', userSchema);

export default User;
