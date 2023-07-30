import { useNavigate } from 'react-router-dom';

import { MenuState } from '@/types/store/menu.types';

import useMenuStore from '../stores/useMenuStore';

export interface UseMenu {
  isAccountDrawerOpen: boolean;
  isLoginDialogOpen: boolean;
  isMenuDrawerOpen: boolean;
  toggleAccountDrawer: (isOpen: boolean) => void;
  toggleLoginDialog: (isOpen: boolean) => void;
  toggleMenuDrawer: (isOpen: boolean) => void;
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
  } = useMenuStore(
    (state): MenuState => ({
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
