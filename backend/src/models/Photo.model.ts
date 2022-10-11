/* eslint-disable sort-keys */
import { model, Schema, Types } from 'mongoose';

import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import { regexUtils } from '@/utils';

const photoSchema = new Schema<inf.IPhoto>(
  {
    _id: Types.ObjectId,
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
        type: [Types.ObjectId],
        ref: 'Tag',
        // * Validate: required - "required: true" does not work for array
        validate: (v: Types.ObjectId[]): boolean => Array.isArray(v) && v.length > 0,
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

const Photo = model<inf.IPhoto>('Photo', photoSchema);

export default Photo;
