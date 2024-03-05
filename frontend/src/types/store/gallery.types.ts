import { PhotoSortOptions } from '../api/photo.types';

// #region State Enum
export enum NavigationValue {
  HOME = 'home',
  GRID = 'grid',
  LIST = 'list',
  MODE = 'mode',
  SEARCH = 'search',
}

export enum LayoutVariant {
  GRID = 'grid',
  LIST = 'list',
}
// #endregion

// #region State Types
export type SortByOption = {
  id: PhotoSortOptions;
  label: string;
};

export type SortByOptions = Record<PhotoSortOptions, SortByOption>;

export type TagsFilterIds = number[];

export type TagsFilter = {
  id: number;
  label: string;
}[];
// #endregion

// #region State Interfaces
export interface GalleryState {
  isFilterDrawerOpen: boolean;
  isPhotoDialogOpen: boolean;
  layoutVariant: LayoutVariant;
  navigationValue: NavigationValue;
  search: string;
  setIsFilterDrawerOpen: (isOpen: boolean) => void;
  setIsPhotoDialogOpen: (isOpen: boolean) => void;
  setLayoutVariant: (variant: LayoutVariant) => void;
  setNavigationValue: (value: NavigationValue) => void;
  setSearch: (search: string) => void;
  setSortBy: (sortBy: PhotoSortOptions) => void;
  setTagsFilter: (tags: TagsFilter) => void;
  setTagsFilterIds: (tags: TagsFilterIds) => void;
  sortBy: PhotoSortOptions;
  tagsFilter: TagsFilter;
  tagsFilterIds: TagsFilterIds;
}

export interface UseGalleryState {
  isFilterDrawerOpen: GalleryState['isFilterDrawerOpen'];
  isPhotoDialogOpen: GalleryState['isPhotoDialogOpen'];
  layoutVariant: GalleryState['layoutVariant'];
  navigationValue: GalleryState['navigationValue'];
  search: GalleryState['search'];
  setIsFilterDrawerOpen: GalleryState['setIsFilterDrawerOpen'];
  setIsPhotoDialogOpen: GalleryState['setIsPhotoDialogOpen'];
  setLayoutVariant: GalleryState['setLayoutVariant'];
  setNavigationValue: GalleryState['setNavigationValue'];
  sortBy: GalleryState['sortBy'];
  tagsFilter: GalleryState['tagsFilter'];
  tagsFilterIds: GalleryState['tagsFilterIds'];
}

export interface UseGalleryFilterState {
  search: GalleryState['search'];
  setSearch: GalleryState['setSearch'];
  setSortBy: GalleryState['setSortBy'];
  setTagsFilter: GalleryState['setTagsFilter'];
  setTagsFilterIds: GalleryState['setTagsFilterIds'];
  sortBy: GalleryState['sortBy'];
  tagsFilter: GalleryState['tagsFilter'];
}
// #endregion
