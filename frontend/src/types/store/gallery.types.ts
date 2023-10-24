import { PhotoSortOptions } from '../api/photo.types';

// #region State Enum
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
export type GalleryTagsFilterIds = number[];

export type GalleryTagsFilter = {
  id: number;
  label: string;
}[];
// #endregion

// #region State Interfaces
export interface GalleryState {
  galleryNavigationValue: GalleryNavigationValue;
  gallerySearch: string;
  gallerySortBy: PhotoSortOptions;
  galleryTagsFilter: GalleryTagsFilter;
  galleryTagsFilterIds: GalleryTagsFilterIds;
  galleryVariant: GalleryVariant;
  isPhotoDialogOpen: boolean;
  isSearchDrawerOpen: boolean;
  setGalleryNavigationValue: (value: GalleryNavigationValue) => void;
  setGallerySearch: (search: string) => void;
  setGallerySortBy: (sortBy: PhotoSortOptions) => void;
  setGalleryTagsFilter: (tags: GalleryTagsFilter) => void;
  setGalleryTagsFilterIds: (tags: GalleryTagsFilterIds) => void;
  setGalleryVariant: (variant: GalleryVariant) => void;
  setIsPhotoDialogOpen: (isOpen: boolean) => void;
  setIsSearchDrawerOpen: (isOpen: boolean) => void;
}
// #endregion
