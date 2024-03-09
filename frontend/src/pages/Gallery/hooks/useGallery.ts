import { useNavigate } from 'react-router-dom';

import useGalleryStore from '@/hooks/stores/useGalleryStore';
import { PhotoSortOptions } from '@/types/api/photo.types';
import {
  LayoutVariant,
  NavigationValue,
  SortByOptionDictionary,
  TagFilter,
  UseGalleryState,
} from '@/types/store/gallery.types';

export interface UseGallery {
  handleChangeNavigationValue: (value: string) => void;
  handleCloseFilterDrawer: () => void;
  handleClosePhotoDialog: () => void;
  handleOpenFilterDrawer: () => void;
  handleOpenPhotoDialog: (photoId?: string) => void;
  handleToggleFilterDrawer: (isOpen: boolean) => void;
  handleTogglePhotoDialog: (isOpen: boolean, photoId?: string) => void;
  isFilterDrawerOpen: boolean;
  isPhotoDialogOpen: boolean;
  layoutVariant: LayoutVariant;
  navigationValue: NavigationValue;
  search: string;
  sortBy: PhotoSortOptions;
  sortByOptions: SortByOptionDictionary;
  tagsFilter: TagFilter[];
  tagsFilterIds: number[];
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

  const sortByOptions = {
    [PhotoSortOptions.NEWEST]: { id: PhotoSortOptions.NEWEST, label: 'Newest' },
    [PhotoSortOptions.OLDEST]: { id: PhotoSortOptions.OLDEST, label: 'Oldest' },
    [PhotoSortOptions.TITLE_AZ]: { id: PhotoSortOptions.TITLE_AZ, label: 'Title (a-z)' },
    [PhotoSortOptions.TITLE_ZA]: { id: PhotoSortOptions.TITLE_ZA, label: 'Title (z-a)' },
    [PhotoSortOptions.RANDOM]: { id: PhotoSortOptions.RANDOM, label: 'Random' },
  };

  const handleToggleFilterDrawer = (isOpen: boolean): void => setIsFilterDrawerOpen(isOpen);

  const handleOpenFilterDrawer = (): void => handleToggleFilterDrawer(true);

  const handleCloseFilterDrawer = (): void => handleToggleFilterDrawer(false);

  const handleTogglePhotoDialog = (isOpen: boolean, photoId?: string): void => {
    if (photoId && isOpen) {
      navigate(`/photo/${photoId}`);
    } else {
      navigate('/');
    }

    setIsPhotoDialogOpen(isOpen);
  };

  const handleOpenPhotoDialog = (photoId?: string): void => handleTogglePhotoDialog(true, photoId);

  const handleClosePhotoDialog = (): void => handleTogglePhotoDialog(false);

  const handleChangeNavigationValue = (value: string): void => {
    const isLayoutVariantChange = value === LayoutVariant.GRID || value === LayoutVariant.LIST;
    if (isLayoutVariantChange) {
      setLayoutVariant(value as LayoutVariant);
    }

    setNavigationValue(value as NavigationValue);
  };

  return {
    handleChangeNavigationValue,
    handleCloseFilterDrawer,
    handleClosePhotoDialog,
    handleOpenFilterDrawer,
    handleOpenPhotoDialog,
    handleToggleFilterDrawer,
    handleTogglePhotoDialog,
    isFilterDrawerOpen,
    isPhotoDialogOpen,
    layoutVariant,
    navigationValue,
    search,
    sortBy,
    sortByOptions,
    tagsFilter,
    tagsFilterIds,
  };
}
