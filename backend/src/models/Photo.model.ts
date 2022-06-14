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
        required: [true, 'Capture date required'],
        type: Date,
      },
      captureLocation: {
        maxLength: [100, 'Max character length exceeded'],
        minLength: [2, 'Must be at least 2 characters'],
        required: [true, 'Capture location required'],
        trim: true,
        type: String,
      },
      imageCaption: {
        maxLength: [300, 'Max character length exceeded'],
        minLength: [2, 'Must be at least 2 characters'],
        required: [true, 'Image caption required'],
        trim: true,
        type: String,
      },
      imageFile: { type: String, required: [true, 'Image file required'] },
      imageSize: {
        default: 'medium',
        enum: {
          values: ['large', 'medium', 'small'],
          message: '{VALUE} is not supported',
        },
        required: [true, 'Image size required'],
        type: String,
      },
      imageTags: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Tag',
          required: [true, 'Image tag required'],
        },
      ],
      imageTitle: {
        maxLength: [50, 'Max character length exceeded'],
        minLength: [2, 'Must be at least 2 characters'],
        required: [true, 'Image title required'],
        trim: true,
        type: String,
      },
      originalImageName: {
        required: [true, 'Original image name required'],
        trim: true,
        type: String,
      },
      storeLink: {
        required: [true, 'Store link required'],
        trim: true,
        type: String,
      },
    },
    equipment: {
      cameraIso: {
        maxLength: [50, 'Max character length exceeded'],
        minLength: [2, 'Must be at least 2 characters'],
        required: [true, 'Camera iso required'],
        trim: true,
        type: String,
      },
      cameraName: {
        maxLength: [50, 'Max character length exceeded'],
        minLength: [2, 'Must be at least 2 characters'],
        required: [true, 'Camera name required'],
        trim: true,
        type: String,
      },
      lensAperture: {
        maxLength: [50, 'Max character length exceeded'],
        minLength: [2, 'Must be at least 2 characters'],
        required: [true, 'Lens aperture required'],
        trim: true,
        type: String,
      },
      lensFocalLength: {
        maxLength: [50, 'Max character length exceeded'],
        minLength: [2, 'Must be at least 2 characters'],
        required: [true, 'Lens focal length required'],
        trim: true,
        type: String,
      },
      lensName: {
        maxLength: [50, 'Max character length exceeded'],
        minLength: [2, 'Must be at least 2 characters'],
        required: [true, 'Lens name required'],
        trim: true,
        type: String,
      },
      lensShutterSpeed: {
        maxLength: [50, 'Max character length exceeded'],
        minLength: [2, 'Must be at least 2 characters'],
        required: [true, 'Lens shutter required'],
        trim: true,
        type: String,
      },
    },
  },
  { timestamps: true },
);

const Photo = model<IPhoto>('Photo', photoSchema);

export default Photo;
