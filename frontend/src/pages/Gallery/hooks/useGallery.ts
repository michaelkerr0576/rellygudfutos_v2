import { useNavigate } from 'react-router-dom';

import useGalleryStore from '@/hooks/stores/useGalleryStore';
import {
  GalleryNavigationValue,
  GallerySortBy,
  GalleryState,
  GalleryTagsFilter,
  GalleryVariant,
} from '@/types/store/gallery.types';

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
  } = useGalleryStore(
    (state): GalleryState => ({
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
