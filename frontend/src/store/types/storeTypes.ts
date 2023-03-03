export type ColorMode = 'light' | 'dark';
export type GalleryNavigationValue = 'home' | 'grid' | 'list' | 'mode' | 'search';
export type GallerySortBy = 'newest' | 'oldest' | 'title_az' | 'title_za' | 'random' | '';
export type GalleryTagsFilter = { id: number; label: string }[];

export interface State {
  colorMode: ColorMode | undefined;
  galleryNavigationValue: GalleryNavigationValue;
  gallerySearch: string;
  gallerySortBy: GallerySortBy;
  galleryTagsFilter: GalleryTagsFilter;
  isAccountDrawerOpen: boolean;
  isMenuDrawerOpen: boolean;
  isSearchDrawerOpen: boolean;
  setColorMode: (colorMode: ColorMode) => void;
  setGalleryNavigationValue: (value: GalleryNavigationValue) => void;
  setGallerySearch: (search: string) => void;
  setGallerySortBy: (sortBy: GallerySortBy) => void;
  setGalleryTagsFilter: (tags: GalleryTagsFilter) => void;
  setIsAccountDrawerOpen: (isOpen: boolean) => void;
  setIsMenuDrawerOpen: (isOpen: boolean) => void;
  setIsSearchDrawerOpen: (isOpen: boolean) => void;
}
