import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { PhotoSortOptions } from '@/types/api/photo.types';
import { GalleryState, LayoutVariant, NavigationValue, TagFilter } from '@/types/store/gallery.types';

const useGalleryStore = create<GalleryState>()(
  // * Enables Redux devtools
  devtools(
    // * Persists state to local storage
    persist(
      (set, _get): GalleryState => ({
        isFilterDrawerOpen: false,
        isPhotoDialogOpen: false,
        layoutVariant: LayoutVariant.GRID,
        navigationValue: NavigationValue.HOME,
        search: '',
        setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean): void =>
          set({ isFilterDrawerOpen }, false, 'SET_IS_FILTER_DRAWER_OPEN'),
        setIsPhotoDialogOpen: (isPhotoDialogOpen: boolean): void =>
          set({ isPhotoDialogOpen }, false, 'SET_IS_PHOTO_DIALOG_OPEN'),
        setLayoutVariant: (layoutVariant: LayoutVariant): void =>
          set({ layoutVariant }, false, 'SET_LAYOUT_VARIANT'),
        setNavigationValue: (navigationValue: NavigationValue): void =>
          set({ navigationValue }, false, 'SET_NAVIGATION_VALUE'),
        setSearch: (search: string): void => set({ search }, false, 'SET_SEARCH_VALUE'),
        setSortBy: (sortBy: PhotoSortOptions): void => set({ sortBy }, false, 'SET_SORT_BY'),
        setTagsFilter: (tagsFilter: TagFilter[]): void => set({ tagsFilter }, false, 'SET_TAGS_FILTER'),
        setTagsFilterIds: (tagsFilterIds: number[]): void =>
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
