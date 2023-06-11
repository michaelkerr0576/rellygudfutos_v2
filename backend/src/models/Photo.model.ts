/* eslint-disable sort-keys */
import { model, Schema, Types } from 'mongoose';

import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as regexUtils from '@/utils/regex.utils';

import * as validateUtils from './utils/validate.utils';
import * as validateMessageUtils from './utils/validateMessage.utils';

const photoSchema = new Schema<inf.Photo>(
  {
    _id: Types.ObjectId,
    aspectRatio: {
      type: String,
      enum: enm.PhotoAspectRatio,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 300,
    },
    captureDate: {
      type: Date,
      required: true,
      default: '1900-01-01T10:10:10.123Z',
      immutable: true,
    },
    equipment: {
      camera: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
      },
      lens: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
      },
    },
    image: {
      fileName: String,
      fileType: String,
      height: Number,
      key: String,
      url: String,
      width: Number,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    photographer: {
      type: Types.ObjectId,
      ref: 'User',
      immutable: true,
    },
    settings: {
      aperture: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        match: regexUtils.cameraLensAperture,
      },
      focalLength: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        match: regexUtils.cameraLensFocalLength,
      },
      iso: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        match: regexUtils.cameraIso,
      },
      shutterSpeed: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        match: regexUtils.cameraLensShutterSpeed,
      },
    },
    storeUrl: {
      type: String,
      required: true,
      trim: true,
      match: regexUtils.urlLink,
    },
    tags: {
      type: [Types.ObjectId],
      ref: 'Tag',
      // * Validate: required - validate needed for array
      validate: [validateUtils.arrayValuesRequired, validateMessageUtils.requiredMessage],
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  { timestamps: true },
);

const Photo = model<inf.Photo>('Photo', photoSchema);

export default Photo;
