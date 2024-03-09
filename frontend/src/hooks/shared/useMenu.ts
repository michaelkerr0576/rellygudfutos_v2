import { useNavigate } from 'react-router-dom';

import { MenuState } from '@/types/store/menu.types';

import useMenuStore from '../stores/useMenuStore';

export interface UseMenu {
  handleCloseAccountDrawer: () => void;
  handleCloseLoginDialog: () => void;
  handleCloseMenuDrawer: () => void;
  handleOpenAccountDrawer: () => void;
  handleOpenLoginDialog: () => void;
  handleOpenMenuDrawer: () => void;
  handleToggleAccountDrawer: (isOpen: boolean) => void;
  handleToggleLoginDialog: (isOpen: boolean) => void;
  handleToggleMenuDrawer: (isOpen: boolean) => void;
  isAccountDrawerOpen: boolean;
  isLoginDialogOpen: boolean;
  isMenuDrawerOpen: boolean;
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

  const handleToggleAccountDrawer = (isOpen: boolean): void => setIsAccountDrawerOpen(isOpen);

  const handleOpenAccountDrawer = (): void => handleToggleAccountDrawer(true);

  const handleCloseAccountDrawer = (): void => handleToggleAccountDrawer(false);

  const handleToggleLoginDialog = (isOpen: boolean): void => {
    if (isOpen) {
      navigate(`/login`);
    } else {
      navigate('/');
    }

    setIsLoginDialogOpen(isOpen);
  };

  const handleOpenLoginDialog = (): void => handleToggleLoginDialog(true);

  const handleCloseLoginDialog = (): void => handleToggleLoginDialog(true);

  const handleToggleMenuDrawer = (isOpen: boolean): void => setIsMenuDrawerOpen(isOpen);

  const handleOpenMenuDrawer = (): void => handleToggleMenuDrawer(true);

  const handleCloseMenuDrawer = (): void => handleToggleMenuDrawer(false);

  return {
    handleCloseAccountDrawer,
    handleCloseLoginDialog,
    handleCloseMenuDrawer,
    handleOpenAccountDrawer,
    handleOpenLoginDialog,
    handleOpenMenuDrawer,
    handleToggleAccountDrawer,
    handleToggleLoginDialog,
    handleToggleMenuDrawer,
    isAccountDrawerOpen,
    isLoginDialogOpen,
    isMenuDrawerOpen,
  };
}
