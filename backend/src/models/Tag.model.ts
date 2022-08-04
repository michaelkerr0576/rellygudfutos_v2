import { Document, model, Schema, Types } from 'mongoose';

export interface ITag extends Document {
  _id: Types.ObjectId;
  photos: Types.ObjectId[];
  tag: string;
}

const tagSchema = new Schema<ITag>(
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

const Tag = model<ITag>('Tag', tagSchema);

export default Tag;
