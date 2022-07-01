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
    imageTags: Schema.Types.ObjectId[];
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
        // * Regex: valid image file - .gif, jpeg, .jpg, .tiff, .png, .webp, .bmp
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
        // * Regex: valid original image file - .gif, jpeg, .jpg, .tiff, .png, .webp, .bmp
        validate: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
      },
      storeLink: {
        required: true,
        trim: true,
        type: String,
        // * Regex: valid http/https web link - https://www.test.com
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
        // * Regex: valid camera iso - only numbers
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
        // * Regex: valid lens aperture - starts with 'f/' and finishes with number
        validate: /^f\/[0-9]*\.[0-9]+$/i,
      },
      lensFocalLength: {
        maxLength: 7,
        minLength: 2,
        required: true,
        trim: true,
        type: String,
        // * Regex: valid lens focal length - starts with number and finishes with 'mm'
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
        // * Regex: valid lens shutter speed - starts with number, followed by '/' and finishes with number
        validate: /^[0-9]+\/[0-9]+$/i,
      },
    },
  },
  { timestamps: true },
);

const Photo = model<IPhoto>('Photo', photoSchema);

export default Photo;
