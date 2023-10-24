import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { PhotoSortOptions } from '@/types/api/photo.types';
import {
  GalleryNavigationValue,
  GalleryState,
  GalleryTagsFilter,
  GalleryTagsFilterIds,
  GalleryVariant,
} from '@/types/store/gallery.types';

const useGalleryStore = create<GalleryState>()(
  // * Enables Redux devtools
  devtools(
    // * Persists state to local storage
    persist(
      (set, _get): GalleryState => ({
        galleryNavigationValue: GalleryNavigationValue.HOME,
        gallerySearch: '',
        gallerySortBy: PhotoSortOptions.NEWEST,
        galleryTagsFilter: [],
        galleryTagsFilterIds: [],
        galleryVariant: GalleryVariant.GRID,
        isPhotoDialogOpen: false,
        isSearchDrawerOpen: false,
        setGalleryNavigationValue: (galleryNavigationValue: GalleryNavigationValue): void =>
          set({ galleryNavigationValue }, false, 'SET_GALLERY_NAVIGATION_VALUE'),
        setGallerySearch: (gallerySearch: string): void =>
          set({ gallerySearch }, false, 'SET_GALLERY_SEARCH_VALUE'),
        setGallerySortBy: (gallerySortBy: PhotoSortOptions): void =>
          set({ gallerySortBy }, false, 'SET_GALLERY_SORT_BY'),
        setGalleryTagsFilter: (galleryTagsFilter: GalleryTagsFilter): void =>
          set({ galleryTagsFilter }, false, 'SET_GALLERY_TAGS_FILTER'),
        setGalleryTagsFilterIds: (galleryTagsFilterIds: GalleryTagsFilterIds): void =>
          set({ galleryTagsFilterIds }, false, 'SET_GALLERY_TAGS_FILTER_IDS'),
        setGalleryVariant: (galleryVariant: GalleryVariant): void =>
          set({ galleryVariant }, false, 'SET_GALLERY_VARIANT'),
        setIsPhotoDialogOpen: (isPhotoDialogOpen: boolean): void =>
          set({ isPhotoDialogOpen }, false, 'SET_IS_PHOTO_DIALOG_OPEN'),
        setIsSearchDrawerOpen: (isSearchDrawerOpen: boolean): void =>
          set({ isSearchDrawerOpen }, false, 'SET_IS_SEARCH_DRAWER_OPEN'),
      }),
      {
        name: 'rgf-state--gallery', // * Local storage key
      },
    ),
  ),
);

export default useGalleryStore;
