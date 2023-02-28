import useStore from '@/store/store';
import { GalleryNavigationValue, State, TagsFilter } from '@/store/types/storeTypes';

export interface UseGallery {
  galleryNavigationValue: GalleryNavigationValue;
  handleTagsFilterChange: (_event: React.SyntheticEvent<Element, Event>, tags: TagsFilter) => void;
  isSearchDrawerOpen: boolean;
  tagsFilter: TagsFilter;
  toggleGalleryNavigationValue: (value: string) => void;
  toggleSearchDrawer: (isOpen: boolean) => void;
}

interface UseGalleryState {
  galleryNavigationValue: State['galleryNavigationValue'];
  isSearchDrawerOpen: State['isSearchDrawerOpen'];
  setGalleryNavigationValue: State['setGalleryNavigationValue'];
  setIsSearchDrawerOpen: State['setIsSearchDrawerOpen'];
  setTagsFilter: State['setTagsFilter'];
  tagsFilter: State['tagsFilter'];
}

export default function useGallery(): UseGallery {
  const {
    galleryNavigationValue,
    isSearchDrawerOpen,
    setGalleryNavigationValue,
    setIsSearchDrawerOpen,
    setTagsFilter,
    tagsFilter,
  } = useStore(
    (state): UseGalleryState => ({
      galleryNavigationValue: state.galleryNavigationValue,
      isSearchDrawerOpen: state.isSearchDrawerOpen,
      setGalleryNavigationValue: state.setGalleryNavigationValue,
      setIsSearchDrawerOpen: state.setIsSearchDrawerOpen,
      setTagsFilter: state.setTagsFilter,
      tagsFilter: state.tagsFilter,
    }),
  );

  const handleTagsFilterChange = (_event: React.SyntheticEvent<Element, Event>, tags: TagsFilter): void =>
    setTagsFilter(tags);

  const toggleGalleryNavigationValue = (value: string): void =>
    setGalleryNavigationValue(value as GalleryNavigationValue);

  const toggleSearchDrawer = (isOpen: boolean): void => setIsSearchDrawerOpen(isOpen);

  return {
    galleryNavigationValue,
    handleTagsFilterChange,
    isSearchDrawerOpen,
    tagsFilter,
    toggleGalleryNavigationValue,
    toggleSearchDrawer,
  };
}
