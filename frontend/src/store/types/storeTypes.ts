export type ColorMode = 'light' | 'dark';

export type GalleryNavigationValue = 'home' | 'grid' | 'list' | 'mode' | 'search';

export type TagsFilter = { id: number; label: string }[];

export interface State {
  colorMode: ColorMode | undefined;
  galleryNavigationValue: GalleryNavigationValue;
  isMenuDrawerOpen: boolean;
  isSearchDrawerOpen: boolean;
  setColorMode: (colorMode: ColorMode) => void;
  setGalleryNavigationValue: (value: GalleryNavigationValue) => void;
  setIsMenuDrawerOpen: (isOpen: boolean) => void;
  setIsSearchDrawerOpen: (isOpen: boolean) => void;
  setTagsFilter: (tags: TagsFilter) => void;
  tagsFilter: TagsFilter;
}
