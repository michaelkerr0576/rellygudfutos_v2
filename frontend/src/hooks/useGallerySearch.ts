import useStore from '@/store/store';
import { State } from '@/store/types/storeTypes';

export interface UseGallerySearch {
  isSearchDrawerOpen: boolean;
  toggleSearchDrawer: (isOpen: boolean) => void;
}

interface UseGallerySearchState {
  isSearchDrawerOpen: State['isSearchDrawerOpen'];
  setIsSearchDrawerOpen: State['setIsSearchDrawerOpen'];
}

export default function useGallerySearch(): UseGallerySearch {
  const { isSearchDrawerOpen, setIsSearchDrawerOpen } = useStore(
    (state): UseGallerySearchState => ({
      isSearchDrawerOpen: state.isSearchDrawerOpen,
      setIsSearchDrawerOpen: state.setIsSearchDrawerOpen,
    }),
  );

  const toggleSearchDrawer = (isOpen: boolean): void => setIsSearchDrawerOpen(isOpen);

  return {
    isSearchDrawerOpen,
    toggleSearchDrawer,
  };
}
