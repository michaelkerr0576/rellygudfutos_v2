// #region State Interfaces
export interface MenuState {
  isAccountDrawerOpen: boolean;
  isLoginDialogOpen: boolean;
  isMenuDrawerOpen: boolean;
  setIsAccountDrawerOpen: (isOpen: boolean) => void;
  setIsLoginDialogOpen: (isOpen: boolean) => void;
  setIsMenuDrawerOpen: (isOpen: boolean) => void;
}
// #endregion
