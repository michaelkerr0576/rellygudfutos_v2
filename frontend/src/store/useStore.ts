import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import {
  ColorMode,
  GalleryNavigationValue,
  GallerySortBy,
  GalleryTagsFilter,
  GalleryVariant,
  State,
} from '@/ts/store';

const useStore = create<State>()(
  // * Enables Redux devtools
  devtools(
    // * Persists state to local storage
    persist(
      (set, _get): State => ({
        colorMode: undefined, // * colorMode undefined while waiting for user preference in browser
        galleryNavigationValue: GalleryNavigationValue.HOME,
        gallerySearch: '',
        gallerySortBy: GallerySortBy.NEWEST,
        galleryTagsFilter: [],
        galleryVariant: GalleryVariant.GRID,
        isAccountDrawerOpen: false,
        isMenuDrawerOpen: false,
        isSearchDrawerOpen: false,
        setColorMode: (colorMode: ColorMode): void => set({ colorMode }, false, 'SET_COLOR_MODE'),
        setGalleryNavigationValue: (galleryNavigationValue: GalleryNavigationValue): void =>
          set({ galleryNavigationValue }, false, 'SET_GALLERY_NAVIGATION_VALUE'),
        setGallerySearch: (gallerySearch: string): void =>
          set({ gallerySearch }, false, 'SET_GALLERY_SEARCH_VALUE'),
        setGallerySortBy: (gallerySortBy: GallerySortBy): void =>
          set({ gallerySortBy }, false, 'SET_GALLERY_SORT_BY'),
        setGalleryTagsFilter: (galleryTagsFilter: GalleryTagsFilter): void =>
          set({ galleryTagsFilter }, false, 'SET_GALLERY_TAGS_FILTER'),
        setGalleryVariant: (galleryVariant: GalleryVariant): void =>
          set({ galleryVariant }, false, 'SET_GALLERY_VARIANT'),
        setIsAccountDrawerOpen: (isAccountDrawerOpen: boolean): void =>
          set({ isAccountDrawerOpen }, false, 'SET_IS_ACCOUNT_DRAWER_OPEN'),
        setIsMenuDrawerOpen: (isMenuDrawerOpen: boolean): void =>
          set({ isMenuDrawerOpen }, false, 'SET_IS_MENU_DRAWER_OPEN'),
        setIsSearchDrawerOpen: (isSearchDrawerOpen: boolean): void =>
          set({ isSearchDrawerOpen }, false, 'SET_IS_SEARCH_DRAWER_OPEN'),
      }),
      {
        name: 'state-storage', // * Local storage key
      },
    ),
  ),
);

export default useStore;