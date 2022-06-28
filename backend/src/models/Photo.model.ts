import { Date, Document, model, Schema } from 'mongoose';

type ImageSize = 'large' | 'medium' | 'small';

export interface IPhoto extends Document {
  _id: Schema.Types.ObjectId;
  details: {
    captureDate: Date;
    captureLocation: string;
    imageCaption: string;
    imageFile: string;
    imageSize: ImageSize;
    imageTags: string[];
    imageTitle: string;
    originalImageName: string;
    storeLink: string;
  };
  equipment: {
    cameraIso: string;
    cameraName: string;
    lensAperture: string;
    lensFocalLength: string;
    lensName: string;
    lensShutterSpeed: string;
  };
}

const photoSchema = new Schema<IPhoto>(
  {
    _id: Schema.Types.ObjectId,
    details: {
      captureDate: {
        default: '1900-01-01T10:10:10.123Z',
        type: Date,
        required: true,
      },
      captureLocation: {
        maxLength: 100,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
      },
      imageCaption: {
        maxLength: 300,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
      },
      imageFile: {
        required: true,
        trim: true,
        type: String,
        validate: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
      },
      imageSize: {
        default: 'medium',
        enum: ['large', 'medium', 'small'],
        type: String,
      },
      imageTags: {
        type: [Schema.Types.ObjectId],
        ref: 'Tag',
        validate: (v: Schema.Types.ObjectId[]): boolean =>
          Array.isArray(v) && v.length > 0,
      },
      imageTitle: {
        maxLength: 50,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
      },
      originalImageName: {
        required: true,
        trim: true,
        type: String,
        validate: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
      },
      storeLink: {
        required: true,
        trim: true,
        type: String,
        validate:
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i,
      },
    },
    equipment: {
      cameraIso: {
        maxLength: 7,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
        validate: /^[0-9]*$/i,
      },
      cameraName: {
        maxLength: 50,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
      },
      lensAperture: {
        maxLength: 7,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
        validate: /^f\/[0-9]*\.[0-9]+$/i,
      },
      lensFocalLength: {
        maxLength: 7,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
        validate: /^[0-9]+mm$/i,
      },
      lensName: {
        maxLength: 50,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
      },
      lensShutterSpeed: {
        maxLength: 7,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
        validate: /^[0-9]+\/[0-9]+$/i,
      },
    },
  },
  { timestamps: true },
);

const Photo = model<IPhoto>('Photo', photoSchema);

export default Photo;
