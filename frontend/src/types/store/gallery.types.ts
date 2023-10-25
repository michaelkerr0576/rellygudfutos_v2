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
export type TagsFilterIds = number[];

export type TagsFilter = {
  id: number;
  label: string;
}[];
// #endregion

// #region State Interfaces
export interface GalleryState {
  isPhotoDialogOpen: boolean;
  isSearchDrawerOpen: boolean;
  layoutVariant: LayoutVariant;
  navigationValue: NavigationValue;
  search: string;
  setIsPhotoDialogOpen: (isOpen: boolean) => void;
  setIsSearchDrawerOpen: (isOpen: boolean) => void;
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
// #endregion
