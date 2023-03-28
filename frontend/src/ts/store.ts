// #region State Enum
export enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
}

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
export type GalleryTagsFilter = { id: number; label: string }[];
// #endregion

// #region State Interfaces
export interface State {
  colorMode: ColorMode | undefined;
  galleryNavigationValue: GalleryNavigationValue;
  gallerySearch: string;
  gallerySortBy: GallerySortBy;
  galleryTagsFilter: GalleryTagsFilter;
  galleryVariant: GalleryVariant;
  isAccountDrawerOpen: boolean;
  isMenuDrawerOpen: boolean;
  isPhotoDialogOpen: boolean;
  isSearchDrawerOpen: boolean;
  setColorMode: (colorMode: ColorMode) => void;
  setGalleryNavigationValue: (value: GalleryNavigationValue) => void;
  setGallerySearch: (search: string) => void;
  setGallerySortBy: (sortBy: GallerySortBy) => void;
  setGalleryTagsFilter: (tags: GalleryTagsFilter) => void;
  setGalleryVariant: (variant: GalleryVariant) => void;
  setIsAccountDrawerOpen: (isOpen: boolean) => void;
  setIsMenuDrawerOpen: (isOpen: boolean) => void;
  setIsPhotoDialogOpen: (isOpen: boolean) => void;
  setIsSearchDrawerOpen: (isOpen: boolean) => void;
}
// #endregion
