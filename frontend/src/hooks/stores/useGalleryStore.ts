import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import {
  GalleryNavigationValue,
  GallerySortBy,
  GalleryState,
  GalleryTagsFilter,
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
        gallerySortBy: GallerySortBy.NEWEST,
        galleryTagsFilter: [],
        galleryVariant: GalleryVariant.GRID,
        isPhotoDialogOpen: false,
        isSearchDrawerOpen: false,
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
