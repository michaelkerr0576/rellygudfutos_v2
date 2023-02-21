import useStore from '@/store/store';
import { State } from '@/store/types/storeTypes';

export interface UseMenu {
  isMenuDrawerOpen: boolean;
  toggleMenuDrawer: (isOpen: boolean) => void;
}

interface UseMenuState {
  isMenuDrawerOpen: State['isMenuDrawerOpen'];
  setIsMenuDrawerOpen: State['setIsMenuDrawerOpen'];
}

export default function useMenu(): UseMenu {
  const { isMenuDrawerOpen, setIsMenuDrawerOpen } = useStore(
    (state): UseMenuState => ({
      isMenuDrawerOpen: state.isMenuDrawerOpen,
      setIsMenuDrawerOpen: state.setIsMenuDrawerOpen,
    }),
  );

  const toggleMenuDrawer = (isOpen: boolean): void => setIsMenuDrawerOpen(isOpen);

  return {
    isMenuDrawerOpen,
    toggleMenuDrawer,
  };
}
