// #region Photo Enum
export enum PhotoAspectRatio {
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait',
}
// #endregion

// #region Photo Response Types
export interface Photo {
  _id: string;
  aspectRatio: PhotoAspectRatio;
  caption: string;
  captureDate: Date;
  equipment: PhotoEquipment;
  image: PhotoImage;
  location: string;
  photographer: PhotoPhotographer;
  settings: PhotoSettings;
  storeUrl: string;
  tags: PhotoTag[];
  title: string;
}

interface PhotoEquipment {
  camera: string;
  lens: string;
}

interface PhotoImage {
  fileName: string;
  fileType: string;
  height: number;
  key: string;
  url: string;
  width: number;
}

interface PhotoPhotographer {
  _id: string;
  email: string;
  name: string;
}

interface PhotoSettings {
  aperture: string;
  focalLength: string;
  iso: string;
  shutterSpeed: string;
}

interface PhotoTag {
  _id: string;
  tag: string;
}
// #endregion
