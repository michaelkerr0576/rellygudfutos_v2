import { useNavigate } from 'react-router-dom';

import useGalleryStore from '@/hooks/stores/useGalleryStore';
import { PhotoSortOptions } from '@/types/api/photo.types';
import {
  LayoutVariant,
  NavigationValue,
  TagsFilter,
  TagsFilterIds,
  UseGalleryState,
} from '@/types/store/gallery.types';

export interface UseGallery {
  isFilterDrawerOpen: boolean;
  isPhotoDialogOpen: boolean;
  layoutVariant: LayoutVariant;
  navigationValue: NavigationValue;
  search: string;
  sortBy: PhotoSortOptions;
  tagsFilter: TagsFilter;
  tagsFilterIds: TagsFilterIds;
  toggleFilterDrawer: (isOpen: boolean) => void;
  toggleNavigationValue: (value: string) => void;
  togglePhotoDialog: (isOpen: boolean, photoId?: string) => void;
}

export default function useGallery(): UseGallery {
  const navigate = useNavigate();

  const {
    isFilterDrawerOpen,
    isPhotoDialogOpen,
    layoutVariant,
    navigationValue,
    search,
    setIsFilterDrawerOpen,
    setIsPhotoDialogOpen,
    setLayoutVariant,
    setNavigationValue,
    sortBy,
    tagsFilter,
    tagsFilterIds,
  } = useGalleryStore(
    (state): UseGalleryState => ({
      isFilterDrawerOpen: state.isFilterDrawerOpen,
      isPhotoDialogOpen: state.isPhotoDialogOpen,
      layoutVariant: state.layoutVariant,
      navigationValue: state.navigationValue,
      search: state.search,
      setIsFilterDrawerOpen: state.setIsFilterDrawerOpen,
      setIsPhotoDialogOpen: state.setIsPhotoDialogOpen,
      setLayoutVariant: state.setLayoutVariant,
      setNavigationValue: state.setNavigationValue,
      sortBy: state.sortBy,
      tagsFilter: state.tagsFilter,
      tagsFilterIds: state.tagsFilterIds,
    }),
  );

  const toggleFilterDrawer = (isOpen: boolean): void => setIsFilterDrawerOpen(isOpen);

  const toggleNavigationValue = (value: string): void => {
    const isLayoutVariantChange = value === LayoutVariant.GRID || value === LayoutVariant.LIST;
    if (isLayoutVariantChange) {
      setLayoutVariant(value as LayoutVariant);
    }

    setNavigationValue(value as NavigationValue);
  };

  const togglePhotoDialog = (isOpen: boolean, photoId?: string): void => {
    if (photoId && isOpen) {
      navigate(`/photo/${photoId}`);
    } else {
      navigate('/');
    }

    setIsPhotoDialogOpen(isOpen);
  };

  return {
    isFilterDrawerOpen,
    isPhotoDialogOpen,
    layoutVariant,
    navigationValue,
    search,
    sortBy,
    tagsFilter,
    tagsFilterIds,
    toggleFilterDrawer,
    toggleNavigationValue,
    togglePhotoDialog,
  };
}
