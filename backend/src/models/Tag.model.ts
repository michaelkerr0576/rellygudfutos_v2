import { Document, model, Schema } from 'mongoose';

export interface ITag extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  photos: Schema.Types.ObjectId[];
}

const tagSchema = new Schema<ITag>(
  {
    _id: Schema.Types.ObjectId,
    name: {
      maxLength: 50,
      minLength: 2,
      required: true,
      trim: true,
      type: String,
    },
    photos: [
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
