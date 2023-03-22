// #region Photo Enum
export enum Orientation {
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait',
}

// TODO - Remove ImageSize when BE is updated
export enum ImageSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}
// #endregion

// #region Photo Interfaces
export interface PhotoTags {
  _id: string;
  tag: string;
}

export interface PhotoPhotographer {
  _id: string;
  email: string;
  name: string;
}

export interface Photo {
  _id: string;
  details: {
    captureDate: Date;
    captureLocation: string;
    imageCaption: string;
    imageKey: string;
    imageName: string;
    imageSize: ImageSize;
    imageTags: PhotoTags[];
    imageTitle: string;
    imageType: string;
    imageUrl: string;
    photographer: PhotoPhotographer;
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
  image: File;
}
// #endregion
