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
