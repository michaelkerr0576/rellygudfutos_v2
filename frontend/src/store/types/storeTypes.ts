export type ColorMode = 'light' | 'dark';

export type GalleryNavigationValue = 'grid' | 'list' | 'mode' | 'search';

export interface State {
  colorMode: ColorMode | undefined;
  galleryNavigationValue: GalleryNavigationValue;
  isMenuDrawerOpen: boolean;
  isSearchDrawerOpen: boolean;
  setColorMode: (colorMode: ColorMode) => void;
  setGalleryNavigationValue: (value: GalleryNavigationValue) => void;
  setIsMenuDrawerOpen: (isOpen: boolean) => void;
  setIsSearchDrawerOpen: (isOpen: boolean) => void;
}
