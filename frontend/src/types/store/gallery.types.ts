// #region State Enum
export enum GallerySortBy {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  TITLE_AZ = 'title_az',
  TITLE_ZA = 'title_za',
  RANDOM = 'random',
}

export enum GalleryNavigationValue {
  HOME = 'home',
  GRID = 'grid',
  LIST = 'list',
  MODE = 'mode',
  SEARCH = 'search',
}

export enum GalleryVariant {
  GRID = 'grid',
  LIST = 'list',
}
// #endregion

// #region State Types
export type GalleryTagsFilter = {
  id: number;
  label: string;
}[];
// #endregion

// #region State Interfaces
export interface GalleryState {
  galleryNavigationValue: GalleryNavigationValue;
  gallerySearch: string;
  gallerySortBy: GallerySortBy;
  galleryTagsFilter: GalleryTagsFilter;
  galleryVariant: GalleryVariant;
  isPhotoDialogOpen: boolean;
  isSearchDrawerOpen: boolean;
  setGalleryNavigationValue: (value: GalleryNavigationValue) => void;
  setGallerySearch: (search: string) => void;
  setGallerySortBy: (sortBy: GallerySortBy) => void;
  setGalleryTagsFilter: (tags: GalleryTagsFilter) => void;
  setGalleryVariant: (variant: GalleryVariant) => void;
  setIsPhotoDialogOpen: (isOpen: boolean) => void;
  setIsSearchDrawerOpen: (isOpen: boolean) => void;
}
// #endregion
