import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
  togglePhotoDialog: (isOpen: boolean, newPhotoId?: string) => void;
  toggleSearchDrawer: (isOpen: boolean) => void;
}

export default function useGallery(): UseGallery {
  const { photoId = '' } = useParams();
  const location = useLocation();
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

  const togglePhotoDialog = (isOpen: boolean, newPhotoId?: string): void => {
    if (newPhotoId && isOpen) {
      navigate(`/photo/${newPhotoId}`);
    } else {
      navigate('/');
    }

    setIsPhotoDialogOpen(isOpen);
  };

  const toggleSearchDrawer = (isOpen: boolean): void => setIsSearchDrawerOpen(isOpen);

  useEffect((): void => {
    // * Check if photo URL is a direct link on first render
    const isPhotoUrl = photoId && location.pathname === `/photo/${photoId}`;
    if (!isPhotoDialogOpen && isPhotoUrl) {
      togglePhotoDialog(true, photoId);
    }

    // * Check if user removed /photo/:photoId from URL and refreshed
    const isGalleryUrl = location.pathname === '/';
    if (isPhotoDialogOpen && isGalleryUrl) {
      togglePhotoDialog(false);
    }
  }, []);

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
