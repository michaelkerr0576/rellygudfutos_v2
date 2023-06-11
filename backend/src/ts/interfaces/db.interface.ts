import { Date, Document, Types } from 'mongoose';

import * as enm from '@/ts/enums/db.enum';

// #region Photo Interface
export interface Photo extends Document {
  _id: Types.ObjectId;
  aspectRatio: enm.PhotoAspectRatio;
  caption: string;
  captureDate: Date;
  equipment: PhotoEquipment;
  image: PhotoImage;
  location: string;
  photographer: PhotoPhotographer | Types.ObjectId;
  settings: PhotoSettings;
  storeUrl: string;
  tags: PhotoTag[] | Types.ObjectId[];
  title: string;
}

interface PhotoEquipment {
  camera: string;
  lens: string;
}

interface PhotoImage {
  fileName: string;
  fileType: string;
  key: string;
  url: string;
}

export interface PhotoPhotographer {
  _id: Types.ObjectId;
  email: string;
  name: string;
}

interface PhotoSettings {
  aperture: string;
  focalLength: string;
  iso: string;
  shutterSpeed: string;
}

export interface PhotoTag {
  _id: Types.ObjectId;
  tag: string;
}
// #endregion

// #region Tag Interface
export interface Tag extends Document {
  _id: Types.ObjectId;
  photos: Types.ObjectId[];
  tag: string;
}
// #endregion

// #region User Interface
export interface User extends Document {
  _id: Types.ObjectId;
  email: string;
  equipment: UserEquipment;
  name: string;
  password: string;
  photos: Types.ObjectId[];
  role: enm.UserRole;
}

interface UserEquipment {
  cameras: string[];
  lenses: string[];
}
// #endregion
