import useStore from '@/store/useStore';
import { GalleryNavigationValue, GallerySortBy, GalleryTagsFilter, GalleryVariant, State } from '@/ts/store';

export interface UseGallery {
  galleryNavigationValue: GalleryNavigationValue;
  gallerySearch: string;
  gallerySortBy: GallerySortBy;
  galleryTagsFilter: GalleryTagsFilter;
  galleryVariant: GalleryVariant;
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
  galleryVariant: State['galleryVariant'];
  isSearchDrawerOpen: State['isSearchDrawerOpen'];
  setGalleryNavigationValue: State['setGalleryNavigationValue'];
  setGallerySearch: State['setGallerySearch'];
  setGallerySortBy: State['setGallerySortBy'];
  setGalleryTagsFilter: State['setGalleryTagsFilter'];
  setGalleryVariant: State['setGalleryVariant'];
  setIsSearchDrawerOpen: State['setIsSearchDrawerOpen'];
}

export default function useGallery(): UseGallery {
  const {
    galleryNavigationValue,
    gallerySearch,
    gallerySortBy,
    galleryTagsFilter,
    galleryVariant,
    isSearchDrawerOpen,
    setGalleryNavigationValue,
    setGallerySearch,
    setGallerySortBy,
    setGalleryTagsFilter,
    setGalleryVariant,
    setIsSearchDrawerOpen,
  } = useStore(
    (state): UseGalleryState => ({
      galleryNavigationValue: state.galleryNavigationValue,
      gallerySearch: state.gallerySearch,
      gallerySortBy: state.gallerySortBy,
      galleryTagsFilter: state.galleryTagsFilter,
      galleryVariant: state.galleryVariant,
      isSearchDrawerOpen: state.isSearchDrawerOpen,
      setGalleryNavigationValue: state.setGalleryNavigationValue,
      setGallerySearch: state.setGallerySearch,
      setGallerySortBy: state.setGallerySortBy,
      setGalleryTagsFilter: state.setGalleryTagsFilter,
      setGalleryVariant: state.setGalleryVariant,
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
    isSearchDrawerOpen,
    toggleGalleryNavigationValue,
    toggleSearchDrawer,
  };
}
