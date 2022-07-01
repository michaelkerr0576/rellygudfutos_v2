import { Document, model, Schema } from 'mongoose';

export interface ITag extends Document {
  _id: Schema.Types.ObjectId;
  photos: Schema.Types.ObjectId[];
  tag: string;
}

const tagSchema = new Schema<ITag>(
  {
    _id: Schema.Types.ObjectId,
    photos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Photo',
      },
    ],
    tag: {
      maxLength: 50,
      minLength: 2,
      required: true,
      trim: true,
      type: String,
    },
  },
  { timestamps: true },
);

const Tag = model<ITag>('Tag', tagSchema);

export default Tag;
