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
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
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
