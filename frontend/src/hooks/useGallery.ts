import useStore from '@/store/store';
import { GalleryNavigationValue, SortBy, State, TagsFilter } from '@/store/types/storeTypes';

export interface UseGallery {
  galleryNavigationValue: GalleryNavigationValue;
  handleSortByChange: (sortBy: string) => void;
  handleTagsFilterChange: (_event: React.SyntheticEvent<Element, Event>, tags: TagsFilter) => void;
  isSearchDrawerOpen: boolean;
  sortBy: SortBy;
  tagsFilter: TagsFilter;
  toggleGalleryNavigationValue: (value: string) => void;
  toggleSearchDrawer: (isOpen: boolean) => void;
}

interface UseGalleryState {
  galleryNavigationValue: State['galleryNavigationValue'];
  isSearchDrawerOpen: State['isSearchDrawerOpen'];
  setGalleryNavigationValue: State['setGalleryNavigationValue'];
  setIsSearchDrawerOpen: State['setIsSearchDrawerOpen'];
  setSortBy: State['setSortBy'];
  setTagsFilter: State['setTagsFilter'];
  sortBy: State['sortBy'];
  tagsFilter: State['tagsFilter'];
}

export default function useGallery(): UseGallery {
  const {
    galleryNavigationValue,
    isSearchDrawerOpen,
    setGalleryNavigationValue,
    setIsSearchDrawerOpen,
    setSortBy,
    setTagsFilter,
    sortBy,
    tagsFilter,
  } = useStore(
    (state): UseGalleryState => ({
      galleryNavigationValue: state.galleryNavigationValue,
      isSearchDrawerOpen: state.isSearchDrawerOpen,
      setGalleryNavigationValue: state.setGalleryNavigationValue,
      setIsSearchDrawerOpen: state.setIsSearchDrawerOpen,
      setSortBy: state.setSortBy,
      setTagsFilter: state.setTagsFilter,
      sortBy: state.sortBy,
      tagsFilter: state.tagsFilter,
    }),
  );

  const handleSortByChange = (sort: string): void => setSortBy(sort as SortBy);

  const handleTagsFilterChange = (_event: React.SyntheticEvent<Element, Event>, tags: TagsFilter): void =>
    setTagsFilter(tags);

  const toggleGalleryNavigationValue = (value: string): void =>
    setGalleryNavigationValue(value as GalleryNavigationValue);

  const toggleSearchDrawer = (isOpen: boolean): void => setIsSearchDrawerOpen(isOpen);

  return {
    galleryNavigationValue,
    handleSortByChange,
    handleTagsFilterChange,
    isSearchDrawerOpen,
    sortBy,
    tagsFilter,
    toggleGalleryNavigationValue,
    toggleSearchDrawer,
  };
}
