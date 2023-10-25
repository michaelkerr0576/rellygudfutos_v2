import { useNavigate } from 'react-router-dom';

import useGalleryStore from '@/hooks/stores/useGalleryStore';
import { PhotoSortOptions } from '@/types/api/photo.types';
import {
  GalleryState,
  LayoutVariant,
  NavigationValue,
  TagsFilter,
  TagsFilterIds,
} from '@/types/store/gallery.types';

export interface UseGallery {
  handleClearFilters: () => void;
  handleSearch: (search: string) => void;
  handleSortBy: (sortBy: string) => void;
  handleTagsFilter: (tags: TagsFilter) => void;
  isPhotoDialogOpen: boolean;
  isSearchDrawerOpen: boolean;
  layoutVariant: LayoutVariant;
  navigationValue: NavigationValue;
  search: string;
  sortBy: PhotoSortOptions;
  tagsFilter: TagsFilter;
  tagsFilterIds: TagsFilterIds;
  toggleNavigationValue: (value: string) => void;
  togglePhotoDialog: (isOpen: boolean, photoId?: string) => void;
  toggleSearchDrawer: (isOpen: boolean) => void;
}

export default function useGallery(): UseGallery {
  const navigate = useNavigate();

  const {
    isPhotoDialogOpen,
    isSearchDrawerOpen,
    layoutVariant,
    navigationValue,
    search,
    setIsPhotoDialogOpen,
    setIsSearchDrawerOpen,
    setLayoutVariant,
    setNavigationValue,
    setSearch,
    setSortBy,
    setTagsFilter,
    setTagsFilterIds,
    sortBy,
    tagsFilter,
    tagsFilterIds,
  } = useGalleryStore(
    (state): GalleryState => ({
      isPhotoDialogOpen: state.isPhotoDialogOpen,
      isSearchDrawerOpen: state.isSearchDrawerOpen,
      layoutVariant: state.layoutVariant,
      navigationValue: state.navigationValue,
      search: state.search,
      setIsPhotoDialogOpen: state.setIsPhotoDialogOpen,
      setIsSearchDrawerOpen: state.setIsSearchDrawerOpen,
      setLayoutVariant: state.setLayoutVariant,
      setNavigationValue: state.setNavigationValue,
      setSearch: state.setSearch,
      setSortBy: state.setSortBy,
      setTagsFilter: state.setTagsFilter,
      setTagsFilterIds: state.setTagsFilterIds,
      sortBy: state.sortBy,
      tagsFilter: state.tagsFilter,
      tagsFilterIds: state.tagsFilterIds,
    }),
  );

  const handleSearch = (value: string): void => setSearch(value);

  const handleSortBy = (sort: string): void => setSortBy(sort as PhotoSortOptions);

  const handleTagsFilter = (tags: TagsFilter): void => {
    const tagIds = tags.map((tag): number => tag.id);
    setTagsFilter(tags);
    setTagsFilterIds(tagIds);
  };

  const handleClearFilters = (): void => {
    handleSearch('');
    handleSortBy(PhotoSortOptions.NEWEST);
    handleTagsFilter([]);
  };

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

  const toggleSearchDrawer = (isOpen: boolean): void => setIsSearchDrawerOpen(isOpen);

  return {
    handleClearFilters,
    handleSearch,
    handleSortBy,
    handleTagsFilter,
    isPhotoDialogOpen,
    isSearchDrawerOpen,
    layoutVariant,
    navigationValue,
    search,
    sortBy,
    tagsFilter,
    tagsFilterIds,
    toggleNavigationValue,
    togglePhotoDialog,
    toggleSearchDrawer,
  };
}
