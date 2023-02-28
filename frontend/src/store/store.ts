import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ColorMode, GalleryNavigationValue, State, TagsFilter } from './types/storeTypes';

const useStore = create<State>()(
  devtools(
    // * Enables Redux devtools
    persist(
      (set, _get): State => ({
        colorMode: undefined,
        galleryNavigationValue: 'home',
        isAccountDrawerOpen: false,
        isMenuDrawerOpen: false,
        isSearchDrawerOpen: false,
        setColorMode: (colorMode: ColorMode): void => set({ colorMode }, false, 'SET_COLOR_MODE'),
        setGalleryNavigationValue: (galleryNavigationValue: GalleryNavigationValue): void =>
          set({ galleryNavigationValue }, false, 'SET_GALLERY_NAVIGATION_VALUE'),
        setIsAccountDrawerOpen: (isAccountDrawerOpen: boolean): void =>
          set({ isAccountDrawerOpen }, false, 'SET_IS_ACCOUNT_DRAWER_OPEN'),
        setIsMenuDrawerOpen: (isMenuDrawerOpen: boolean): void =>
          set({ isMenuDrawerOpen }, false, 'SET_IS_MENU_DRAWER_OPEN'),
        setIsSearchDrawerOpen: (isSearchDrawerOpen: boolean): void =>
          set({ isSearchDrawerOpen }, false, 'SET_IS_SEARCH_DRAWER_OPEN'),
        setTagsFilter: (tagsFilter: TagsFilter): void => set({ tagsFilter }, false, 'SET_TAGS_FILTER'),
        tagsFilter: [],
      }),
      {
        // * Persists state to local storage
        name: 'state-storage',
      },
    ),
  ),
);

export default useStore;
