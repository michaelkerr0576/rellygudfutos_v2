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
        type: Date,
        required: true,
        default: '1900-01-01T10:10:10.123Z',
      },
      captureLocation: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 100,
      },
      imageCaption: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 300,
      },
      imageFile: {
        type: String,
        required: true,
        trim: true,
        // * Regex: valid image file - .gif, jpeg, .jpg, .tiff, .png, .webp, .bmp
        match: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
      },
      imageSize: {
        type: String,
        enum: ['large', 'medium', 'small'],
        default: 'medium',
      },
      imageTags: {
        type: [Schema.Types.ObjectId],
        ref: 'Tag',
        validate: (v: Schema.Types.ObjectId[]): boolean =>
          Array.isArray(v) && v.length > 0,
      },
      imageTitle: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
      },
      originalImageName: {
        type: String,
        required: true,
        trim: true,
        // * Regex: valid original image file - .gif, jpeg, .jpg, .tiff, .png, .webp, .bmp
        match: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
      },
      storeLink: {
        type: String,
        required: true,
        trim: true,
        // * Regex: valid http/https web link - https://www.test.com
        match:
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i,
      },
    },
    equipment: {
      cameraIso: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        // * Regex: valid camera iso - only numbers
        match: /^[0-9]*$/i,
      },
      cameraName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
      },
      lensAperture: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        // * Regex: valid lens aperture - starts with 'f/' and finishes with number
        match: /^f\/[0-9]*\.[0-9]+$/i,
      },
      lensFocalLength: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        // * Regex: valid lens focal length - starts with number and finishes with 'mm'
        match: /^[0-9]+mm$/i,
      },
      lensName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
      },
      lensShutterSpeed: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 7,
        // * Regex: valid lens shutter speed - starts with number, followed by '/' and finishes with number
        match: /^[0-9]+\/[0-9]+$/i,
      },
    },
  },
  { timestamps: true },
);

const Photo = model<IPhoto>('Photo', photoSchema);

export default Photo;
