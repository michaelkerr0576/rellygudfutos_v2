import { useEffect, useState } from 'react';

import useGalleryStore from '@/hooks/stores/useGalleryStore';
import usePrevious from '@/hooks/utils/usePrevious';
import { PhotoSortOptions } from '@/types/api/photo.types';
import { TagsFilter, UseGalleryFilterState } from '@/types/store/gallery.types';

export interface UseGalleryFilter {
  handleApplyFilters: () => void;
  handleClearFilters: () => void;
  handleSearch: (search: string) => void;
  handleSortBy: (sortBy: string) => void;
  handleTagsFilter: (tags: TagsFilter) => void;
  isFilterDirty: boolean;
}

export default function useGalleryFilter(
  onRefetchPhotos: () => void,
  toggleFilterDrawer: (isOpen: boolean) => void,
): UseGalleryFilter {
  const { search, setSearch, setSortBy, setTagsFilter, setTagsFilterIds, sortBy, tagsFilterIds } =
    useGalleryStore(
      (state): UseGalleryFilterState => ({
        search: state.search,
        setSearch: state.setSearch,
        setSortBy: state.setSortBy,
        setTagsFilter: state.setTagsFilter,
        setTagsFilterIds: state.setTagsFilterIds,
        sortBy: state.sortBy,
        tagsFilterIds: state.tagsFilterIds,
      }),
    );

  const [isFilterDirty, setIsFilterDirty] = useState<boolean>(false);

  const previousSearch = usePrevious(search);
  const previousSortBy = usePrevious(sortBy);
  const previousTagsFilterIds = usePrevious(tagsFilterIds);

  useEffect((): void => {
    const hasPreviousValues =
      typeof previousSearch === 'string' && !!previousSortBy && !!previousTagsFilterIds;
    if (hasPreviousValues) {
      const isSearchChanged = previousSearch !== search;
      const isSortByChanged = previousSortBy !== sortBy;
      const isTagsChanged = previousTagsFilterIds.length !== tagsFilterIds.length;
      const hasFiltersChanged = isSearchChanged || isSortByChanged || isTagsChanged;

      setIsFilterDirty(hasFiltersChanged);
    }
  }, [search, sortBy, tagsFilterIds.length]);

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

  const handleApplyFilters = (): void => {
    onRefetchPhotos();
    setIsFilterDirty(false);
    toggleFilterDrawer(false);
  };

  return {
    handleApplyFilters,
    handleClearFilters,
    handleSearch,
    handleSortBy,
    handleTagsFilter,
    isFilterDirty,
  };
}
