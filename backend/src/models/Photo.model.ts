import { Date, Document, model, Schema } from 'mongoose';

import * as enm from '@/types/enum.types';
import { regexUtils } from '@/utils';

export interface IPhoto extends Document {
  _id: Schema.Types.ObjectId;
  details: {
    captureDate: Date;
    captureLocation: string;
    imageCaption: string;
    imageFile: string;
    imageSize: enm.ImageSize;
    imageTags: Schema.Types.ObjectId[];
    imageTitle: string;
    originalImageName: string;
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

const photoSchema = new Schema<IPhoto>(
  {
    _id: Schema.Types.ObjectId,
    details: {
      captureDate: {
        type: Date,
        required: true,
        default: '1900-01-01T10:10:10.123Z',
      },
      captureLocation: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 100,
      },
      imageCaption: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 300,
      },
      imageFile: {
        type: String,
        required: true,
        trim: true,
        match: regexUtils.imageFile,
      },
      imageSize: {
        type: String,
        enum: enm.ImageSize,
        default: enm.ImageSize.MEDIUM,
      },
      imageTags: {
        type: [Schema.Types.ObjectId],
        ref: 'Tag',
        // * Validate: required - "required: true" does not work for array
        validate: (v: Schema.Types.ObjectId[]): boolean => Array.isArray(v) && v.length > 0,
      },
      imageTitle: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
      },
      originalImageName: {
        type: String,
        required: true,
        trim: true,
        match: regexUtils.imageFile,
      },
      storeLink: {
        type: String,
        required: true,
        trim: true,
        match: regexUtils.urlLink,
      },
    },
    equipment: {
      cameraIso: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        match: regexUtils.cameraIso,
      },
      cameraName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
      },
      lensAperture: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        match: regexUtils.cameraLensAperture,
      },
      lensFocalLength: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        match: regexUtils.cameraLensFocalLength,
      },
      lensName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
      },
      lensShutterSpeed: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        match: regexUtils.cameraLensShutterSpeed,
      },
    },
  },
  { timestamps: true },
);

const Photo = model<IPhoto>('Photo', photoSchema);

export default Photo;
