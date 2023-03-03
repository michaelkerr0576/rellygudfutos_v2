import useStore from '@/store/store';
import { GalleryNavigationValue, GallerySortBy, GalleryTagsFilter, State } from '@/store/types/storeTypes';

export interface UseGallery {
  galleryNavigationValue: GalleryNavigationValue;
  gallerySearch: string;
  gallerySortBy: GallerySortBy;
  galleryTagsFilter: GalleryTagsFilter;
  handleGallerySearch: (search: string) => void;
  handleGallerySortBy: (sortBy: string) => void;
  handleGalleryTagsFilter: (tags: GalleryTagsFilter) => void;
  isSearchDrawerOpen: boolean;
  toggleGalleryNavigationValue: (value: string) => void;
  toggleSearchDrawer: (isOpen: boolean) => void;
}

interface UseGalleryState {
  galleryNavigationValue: State['galleryNavigationValue'];
  gallerySearch: State['gallerySearch'];
  gallerySortBy: State['gallerySortBy'];
  galleryTagsFilter: State['galleryTagsFilter'];
  isSearchDrawerOpen: State['isSearchDrawerOpen'];
  setGalleryNavigationValue: State['setGalleryNavigationValue'];
  setGallerySearch: State['setGallerySearch'];
  setGallerySortBy: State['setGallerySortBy'];
  setGalleryTagsFilter: State['setGalleryTagsFilter'];
  setIsSearchDrawerOpen: State['setIsSearchDrawerOpen'];
}

export default function useGallery(): UseGallery {
  const {
    galleryNavigationValue,
    gallerySearch,
    gallerySortBy,
    galleryTagsFilter,
    isSearchDrawerOpen,
    setGalleryNavigationValue,
    setGallerySearch,
    setGallerySortBy,
    setGalleryTagsFilter,
    setIsSearchDrawerOpen,
  } = useStore(
    (state): UseGalleryState => ({
      galleryNavigationValue: state.galleryNavigationValue,
      gallerySearch: state.gallerySearch,
      gallerySortBy: state.gallerySortBy,
      galleryTagsFilter: state.galleryTagsFilter,
      isSearchDrawerOpen: state.isSearchDrawerOpen,
      setGalleryNavigationValue: state.setGalleryNavigationValue,
      setGallerySearch: state.setGallerySearch,
      setGallerySortBy: state.setGallerySortBy,
      setGalleryTagsFilter: state.setGalleryTagsFilter,
      setIsSearchDrawerOpen: state.setIsSearchDrawerOpen,
    }),
  );

  const handleGallerySearch = (search: string): void => setGallerySearch(search);

  const handleGallerySortBy = (sort: string): void => setGallerySortBy(sort as GallerySortBy);

  const handleGalleryTagsFilter = (tags: GalleryTagsFilter): void => setGalleryTagsFilter(tags);

  const toggleGalleryNavigationValue = (value: string): void =>
    setGalleryNavigationValue(value as GalleryNavigationValue);

  const toggleSearchDrawer = (isOpen: boolean): void => setIsSearchDrawerOpen(isOpen);

  return {
    galleryNavigationValue,
    gallerySearch,
    gallerySortBy,
    galleryTagsFilter,
    handleGallerySearch,
    handleGallerySortBy,
    handleGalleryTagsFilter,
    isSearchDrawerOpen,
    toggleGalleryNavigationValue,
    toggleSearchDrawer,
  };
}
