import { Date, Document, Types } from 'mongoose';

import * as enm from '@/ts/enums/db.enum';

// #region Photo Interface
export interface IPhoto extends Document {
  _id: Types.ObjectId;
  details: {
    captureDate: Date;
    captureLocation: string;
    imageCaption: string;
    imageKey: string;
    imageName: string;
    imageSize: enm.ImageSize;
    imageTags: IPhotoImageTags[] | Types.ObjectId[];
    imageTitle: string;
    imageType: string;
    imageUrl: string;
    photographer: IPhotoPhotographer | Types.ObjectId;
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
  image: File;
}

export interface IPhotoImageTags {
  _id: Types.ObjectId;
  tag: string;
}

export interface IPhotoPhotographer {
  _id: Types.ObjectId;
  email: string;
  name: string;
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
  equipment: {
    cameras: string[];
    lenses: string[];
  };
  name: string;
  password: string;
  photos: Types.ObjectId[];
  role: enm.UserRole;
}
// #endregion
