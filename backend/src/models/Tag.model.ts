/* eslint-disable sort-keys */
import { model, Schema, Types } from 'mongoose';

import * as inf from '@/ts/interfaces/db.interface';

const tagSchema = new Schema<inf.Tag>(
  {
    _id: Types.ObjectId,
    photos: [
      {
        type: Types.ObjectId,
        ref: 'Photo',
      },
    ],
    tag: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  { timestamps: true },
);

const Tag = model<inf.Tag>('Tag', tagSchema);

export default Tag;
