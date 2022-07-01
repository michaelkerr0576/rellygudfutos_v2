import { Document, model, Schema } from 'mongoose';

export interface ITag extends Document {
  _id: Schema.Types.ObjectId;
  tagName: string;
  tagPhotos: Schema.Types.ObjectId[];
}

const tagSchema = new Schema<ITag>(
  {
    _id: Schema.Types.ObjectId,
    tagName: {
      maxLength: 50,
      minLength: 2,
      required: true,
      trim: true,
      type: String,
    },
    tagPhotos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Photo',
      },
    ],
  },
  { timestamps: true },
);

const Tag = model<ITag>('Tag', tagSchema);

export default Tag;
