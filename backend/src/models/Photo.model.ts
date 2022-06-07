import { Document, model, Schema } from 'mongoose';

interface IPhoto extends Document {
  name: string;
  email: string;
  avatar?: string;
}

const photoSchema = new Schema<IPhoto>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

export default model<IPhoto>('Photo', photoSchema);
