import { useEffect, useState } from 'react';

import useGalleryStore from '@/hooks/stores/useGalleryStore';
import { PhotoSortOptions } from '@/types/api/photo.types';
import { TagsFilter, UseGalleryFilterState } from '@/types/store/gallery.types';

export interface UseGalleryFilter {
  draftSearch: string;
  draftSortBy: string;
  draftTagsFilter: TagsFilter;
  handleApplyFilters: () => void;
  handleClearFilters: () => void;
  handleSearch: (search: string) => void;
  handleSortBy: (sortBy: string) => void;
  handleTagsFilter: (tags: TagsFilter) => void;
  isFilterDirty: boolean;
}

export interface UseGalleryFilterProps {
  toggleFilterDrawer: (isOpen: boolean) => void;
}

export default function useGalleryFilter(props: UseGalleryFilterProps): UseGalleryFilter {
  const { toggleFilterDrawer } = props;

  const { search, setSearch, setSortBy, setTagsFilter, setTagsFilterIds, sortBy, tagsFilter } =
    useGalleryStore(
      (state): UseGalleryFilterState => ({
        search: state.search,
        setSearch: state.setSearch,
        setSortBy: state.setSortBy,
        setTagsFilter: state.setTagsFilter,
        setTagsFilterIds: state.setTagsFilterIds,
        sortBy: state.sortBy,
        tagsFilter: state.tagsFilter,
      }),
    );

  const [draftSearch, setDraftSearch] = useState<string>(search);
  const [draftSortBy, setDraftSortBy] = useState<PhotoSortOptions>(sortBy);
  const [draftTagsFilter, setDraftTagsFilter] = useState<TagsFilter>(tagsFilter);
  const [isFilterDirty, setIsFilterDirty] = useState<boolean>(false);

  useEffect((): void => {
    const isSearchChanged = draftSearch !== search;
    const isSortByChanged = draftSortBy !== sortBy;
    const isTagsChanged = draftTagsFilter.length !== tagsFilter.length;
    const hasFiltersChanged = isSearchChanged || isSortByChanged || isTagsChanged;

    setIsFilterDirty(hasFiltersChanged);
  }, [draftSearch, draftSortBy, draftTagsFilter.length]);

  const handleSearch = (value: string): void => setDraftSearch(value);

  const handleSortBy = (sort: string): void => setDraftSortBy(sort as PhotoSortOptions);

  const handleTagsFilter = (tags: TagsFilter): void => setDraftTagsFilter(tags);

  const handleClearFilters = (): void => {
    setDraftSearch('');
    setDraftSortBy(PhotoSortOptions.NEWEST);
    setDraftTagsFilter([]);
  };

  const handleApplyFilters = async (): Promise<void> => {
    const draftTagIds = draftTagsFilter.map((tag): number => tag.id);

    setSearch(draftSearch);
    setSortBy(draftSortBy);
    setTagsFilter(draftTagsFilter);
    setTagsFilterIds(draftTagIds);
    setIsFilterDirty(false);
    toggleFilterDrawer(false);
  };

  return {
    draftSearch,
    draftSortBy,
    draftTagsFilter,
    handleApplyFilters,
    handleClearFilters,
    handleSearch,
    handleSortBy,
    handleTagsFilter,
    isFilterDirty,
  };
}
