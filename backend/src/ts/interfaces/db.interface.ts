import { Date, Document, Types } from 'mongoose';

import * as enm from '@/ts/enums/db.enum';

// #region Photo Interface
export interface IPhoto extends Document {
  _id: Types.ObjectId;
  details: {
    captureDate: Date;
    captureLocation: string;
    imageCaption: string;
    imageFile: string;
    imageSize: enm.ImageSize;
    imageTags: Types.ObjectId[];
    imageTitle: string;
    originalImageName: string;
    photographer: Types.ObjectId;
    storeLink: string;
  };
  equipment: {
    cameraIso: string;
    cameraName: string;
    lensAperture: string;
    lensFocalLength: string;
    lensName: string;
    lensShutterSpeed: string;
  };
}
// #endregion

// #region Tag Interface
export interface ITag extends Document {
  _id: Types.ObjectId;
  photos: Types.ObjectId[];
  tag: string;
}
// #endregion

// #region User Interface
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  role: enm.UserRole;
}
// #endregion
