import useStore from '@/store/store';
import { GalleryNavigationValue, State } from '@/store/types/storeTypes';

export interface UseGallery {
  galleryNavigationValue: GalleryNavigationValue;
  isSearchDrawerOpen: boolean;
  toggleGalleryNavigationValue: (value: string) => void;
  toggleSearchDrawer: (isOpen: boolean) => void;
}

interface UseGalleryState {
  galleryNavigationValue: State['galleryNavigationValue'];
  isSearchDrawerOpen: State['isSearchDrawerOpen'];
  setGalleryNavigationValue: State['setGalleryNavigationValue'];
  setIsSearchDrawerOpen: State['setIsSearchDrawerOpen'];
}

export default function useGallery(): UseGallery {
  const { galleryNavigationValue, isSearchDrawerOpen, setGalleryNavigationValue, setIsSearchDrawerOpen } =
    useStore(
      (state): UseGalleryState => ({
        galleryNavigationValue: state.galleryNavigationValue,
        isSearchDrawerOpen: state.isSearchDrawerOpen,
        setGalleryNavigationValue: state.setGalleryNavigationValue,
        setIsSearchDrawerOpen: state.setIsSearchDrawerOpen,
      }),
    );

  const toggleGalleryNavigationValue = (value: string): void =>
    setGalleryNavigationValue(value as GalleryNavigationValue);

  const toggleSearchDrawer = (isOpen: boolean): void => setIsSearchDrawerOpen(isOpen);

  return {
    galleryNavigationValue,
    isSearchDrawerOpen,
    toggleGalleryNavigationValue,
    toggleSearchDrawer,
  };
}
