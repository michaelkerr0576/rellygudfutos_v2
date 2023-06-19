import { useNavigate } from 'react-router-dom';

import useStore from '@/store/useStore';
import {
  GalleryNavigationValue,
  GallerySortBy,
  GalleryTagsFilter,
  GalleryVariant,
  State,
} from '@/types/store.types';

export interface UseGallery {
  galleryNavigationValue: GalleryNavigationValue;
  gallerySearch: string;
  gallerySortBy: GallerySortBy;
  galleryTagsFilter: GalleryTagsFilter;
  galleryVariant: GalleryVariant;
  handleGallerySearch: (search: string) => void;
  handleGallerySortBy: (sortBy: string) => void;
  handleGalleryTagsFilter: (tags: GalleryTagsFilter) => void;
  isPhotoDialogOpen: boolean;
  isSearchDrawerOpen: boolean;
  toggleGalleryNavigationValue: (value: string) => void;
  togglePhotoDialog: (isOpen: boolean, photoId?: string) => void;
  toggleSearchDrawer: (isOpen: boolean) => void;
}

interface UseGalleryState {
  galleryNavigationValue: State['galleryNavigationValue'];
  gallerySearch: State['gallerySearch'];
  gallerySortBy: State['gallerySortBy'];
  galleryTagsFilter: State['galleryTagsFilter'];
  galleryVariant: State['galleryVariant'];
  isPhotoDialogOpen: State['isPhotoDialogOpen'];
  isSearchDrawerOpen: State['isSearchDrawerOpen'];
  setGalleryNavigationValue: State['setGalleryNavigationValue'];
  setGallerySearch: State['setGallerySearch'];
  setGallerySortBy: State['setGallerySortBy'];
  setGalleryTagsFilter: State['setGalleryTagsFilter'];
  setGalleryVariant: State['setGalleryVariant'];
  setIsPhotoDialogOpen: State['setIsPhotoDialogOpen'];
  setIsSearchDrawerOpen: State['setIsSearchDrawerOpen'];
}

export default function useGallery(): UseGallery {
  const navigate = useNavigate();
  const {
    galleryNavigationValue,
    gallerySearch,
    gallerySortBy,
    galleryTagsFilter,
    galleryVariant,
    isPhotoDialogOpen,
    isSearchDrawerOpen,
    setGalleryNavigationValue,
    setGallerySearch,
    setGallerySortBy,
    setGalleryTagsFilter,
    setGalleryVariant,
    setIsPhotoDialogOpen,
    setIsSearchDrawerOpen,
  } = useStore(
    (state): UseGalleryState => ({
      galleryNavigationValue: state.galleryNavigationValue,
      gallerySearch: state.gallerySearch,
      gallerySortBy: state.gallerySortBy,
      galleryTagsFilter: state.galleryTagsFilter,
      galleryVariant: state.galleryVariant,
      isPhotoDialogOpen: state.isPhotoDialogOpen,
      isSearchDrawerOpen: state.isSearchDrawerOpen,
      setGalleryNavigationValue: state.setGalleryNavigationValue,
      setGallerySearch: state.setGallerySearch,
      setGallerySortBy: state.setGallerySortBy,
      setGalleryTagsFilter: state.setGalleryTagsFilter,
      setGalleryVariant: state.setGalleryVariant,
      setIsPhotoDialogOpen: state.setIsPhotoDialogOpen,
      setIsSearchDrawerOpen: state.setIsSearchDrawerOpen,
    }),
  );

  const handleGallerySearch = (search: string): void => setGallerySearch(search);

  const handleGallerySortBy = (sort: string): void => setGallerySortBy(sort as GallerySortBy);

  const handleGalleryTagsFilter = (tags: GalleryTagsFilter): void => setGalleryTagsFilter(tags);

  const toggleGalleryNavigationValue = (value: string): void => {
    const isGalleryVariantChange = value === GalleryVariant.GRID || value === GalleryVariant.LIST;
    if (isGalleryVariantChange) {
      setGalleryVariant(value as GalleryVariant);
    }

    setGalleryNavigationValue(value as GalleryNavigationValue);
  };

  const togglePhotoDialog = (isOpen: boolean, photoId?: string): void => {
    if (photoId && isOpen) {
      navigate(`/photo/${photoId}`);
    } else {
      navigate('/');
    }

    setIsPhotoDialogOpen(isOpen);
  };

  const toggleSearchDrawer = (isOpen: boolean): void => setIsSearchDrawerOpen(isOpen);

  return {
    galleryNavigationValue,
    gallerySearch,
    gallerySortBy,
    galleryTagsFilter,
    galleryVariant,
    handleGallerySearch,
    handleGallerySortBy,
    handleGalleryTagsFilter,
    isPhotoDialogOpen,
    isSearchDrawerOpen,
    toggleGalleryNavigationValue,
    togglePhotoDialog,
    toggleSearchDrawer,
  };
}
