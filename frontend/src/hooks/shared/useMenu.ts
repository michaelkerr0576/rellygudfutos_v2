import { useNavigate } from 'react-router-dom';

import useStore from '@/store/useStore';
import { State } from '@/types/store.types';

export interface UseMenu {
  isAccountDrawerOpen: boolean;
  isLoginDialogOpen: boolean;
  isMenuDrawerOpen: boolean;
  toggleAccountDrawer: (isOpen: boolean) => void;
  toggleLoginDialog: (isOpen: boolean) => void;
  toggleMenuDrawer: (isOpen: boolean) => void;
}

interface UseMenuState {
  isAccountDrawerOpen: State['isAccountDrawerOpen'];
  isLoginDialogOpen: State['isLoginDialogOpen'];
  isMenuDrawerOpen: State['isMenuDrawerOpen'];
  setIsAccountDrawerOpen: State['setIsAccountDrawerOpen'];
  setIsLoginDialogOpen: State['setIsLoginDialogOpen'];
  setIsMenuDrawerOpen: State['setIsMenuDrawerOpen'];
}

export default function useMenu(): UseMenu {
  const navigate = useNavigate();
  const {
    isAccountDrawerOpen,
    isLoginDialogOpen,
    isMenuDrawerOpen,
    setIsAccountDrawerOpen,
    setIsLoginDialogOpen,
    setIsMenuDrawerOpen,
  } = useStore(
    (state): UseMenuState => ({
      isAccountDrawerOpen: state.isAccountDrawerOpen,
      isLoginDialogOpen: state.isLoginDialogOpen,
      isMenuDrawerOpen: state.isMenuDrawerOpen,
      setIsAccountDrawerOpen: state.setIsAccountDrawerOpen,
      setIsLoginDialogOpen: state.setIsLoginDialogOpen,
      setIsMenuDrawerOpen: state.setIsMenuDrawerOpen,
    }),
  );

  const toggleAccountDrawer = (isOpen: boolean): void => setIsAccountDrawerOpen(isOpen);

  const toggleLoginDialog = (isOpen: boolean): void => {
    if (isOpen) {
      navigate(`/account/login`);
    } else {
      navigate('/');
    }

    setIsLoginDialogOpen(isOpen);
  };

  const toggleMenuDrawer = (isOpen: boolean): void => setIsMenuDrawerOpen(isOpen);

  return {
    isAccountDrawerOpen,
    isLoginDialogOpen,
    isMenuDrawerOpen,
    toggleAccountDrawer,
    toggleLoginDialog,
    toggleMenuDrawer,
  };
}
