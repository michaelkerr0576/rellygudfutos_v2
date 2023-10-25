import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { PhotoSortOptions } from '@/types/api/photo.types';
import {
  GalleryState,
  LayoutVariant,
  NavigationValue,
  TagsFilter,
  TagsFilterIds,
} from '@/types/store/gallery.types';

const useGalleryStore = create<GalleryState>()(
  // * Enables Redux devtools
  devtools(
    // * Persists state to local storage
    persist(
      (set, _get): GalleryState => ({
        isPhotoDialogOpen: false,
        isSearchDrawerOpen: false,
        layoutVariant: LayoutVariant.GRID,
        navigationValue: NavigationValue.HOME,
        search: '',
        setIsPhotoDialogOpen: (isPhotoDialogOpen: boolean): void =>
          set({ isPhotoDialogOpen }, false, 'SET_IS_PHOTO_DIALOG_OPEN'),
        setIsSearchDrawerOpen: (isSearchDrawerOpen: boolean): void =>
          set({ isSearchDrawerOpen }, false, 'SET_IS_SEARCH_DRAWER_OPEN'),
        setLayoutVariant: (layoutVariant: LayoutVariant): void =>
          set({ layoutVariant }, false, 'SET_LAYOUT_VARIANT'),
        setNavigationValue: (navigationValue: NavigationValue): void =>
          set({ navigationValue }, false, 'SET_NAVIGATION_VALUE'),
        setSearch: (search: string): void => set({ search }, false, 'SET_SEARCH_VALUE'),
        setSortBy: (sortBy: PhotoSortOptions): void => set({ sortBy }, false, 'SET_SORT_BY'),
        setTagsFilter: (tagsFilter: TagsFilter): void => set({ tagsFilter }, false, 'SET_TAGS_FILTER'),
        setTagsFilterIds: (tagsFilterIds: TagsFilterIds): void =>
          set({ tagsFilterIds }, false, 'SET_TAGS_FILTER_IDS'),
        sortBy: PhotoSortOptions.NEWEST,
        tagsFilter: [],
        tagsFilterIds: [],
      }),
      {
        name: 'rgf-state--gallery', // * Local storage key
      },
    ),
  ),
);

export default useGalleryStore;
