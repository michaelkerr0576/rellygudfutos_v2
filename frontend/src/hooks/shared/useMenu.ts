import useStore from '@/store/useStore';
import { State } from '@/types/store.types';

export interface UseMenu {
  isAccountDrawerOpen: boolean;
  isMenuDrawerOpen: boolean;
  toggleAccountDrawer: (isOpen: boolean) => void;
  toggleMenuDrawer: (isOpen: boolean) => void;
}

interface UseMenuState {
  isAccountDrawerOpen: State['isAccountDrawerOpen'];
  isMenuDrawerOpen: State['isMenuDrawerOpen'];
  setIsAccountDrawerOpen: State['setIsAccountDrawerOpen'];
  setIsMenuDrawerOpen: State['setIsMenuDrawerOpen'];
}

export default function useMenu(): UseMenu {
  const { isAccountDrawerOpen, isMenuDrawerOpen, setIsAccountDrawerOpen, setIsMenuDrawerOpen } = useStore(
    (state): UseMenuState => ({
      isAccountDrawerOpen: state.isAccountDrawerOpen,
      isMenuDrawerOpen: state.isMenuDrawerOpen,
      setIsAccountDrawerOpen: state.setIsAccountDrawerOpen,
      setIsMenuDrawerOpen: state.setIsMenuDrawerOpen,
    }),
  );

  const toggleAccountDrawer = (isOpen: boolean): void => setIsAccountDrawerOpen(isOpen);

  const toggleMenuDrawer = (isOpen: boolean): void => setIsMenuDrawerOpen(isOpen);

  return {
    isAccountDrawerOpen,
    isMenuDrawerOpen,
    toggleAccountDrawer,
    toggleMenuDrawer,
  };
}
