import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { MenuState } from '@/types/store/menu.types';

const useMenuStore = create<MenuState>()(
  // * Enables Redux devtools
  devtools(
    // * Persists state to local storage
    persist(
      (set, _get): MenuState => ({
        isAccountDrawerOpen: false,
        isLoginDialogOpen: false,
        isMenuDrawerOpen: false,
        setIsAccountDrawerOpen: (isAccountDrawerOpen: boolean): void =>
          set({ isAccountDrawerOpen }, false, 'SET_IS_ACCOUNT_DRAWER_OPEN'),
        setIsLoginDialogOpen: (isLoginDialogOpen: boolean): void =>
          set({ isLoginDialogOpen }, false, 'SET_IS_LOGIN_DIALOG_OPEN'),
        setIsMenuDrawerOpen: (isMenuDrawerOpen: boolean): void =>
          set({ isMenuDrawerOpen }, false, 'SET_IS_MENU_DRAWER_OPEN'),
      }),
      {
        name: 'rgf-state--menu', // * Local storage key
      },
    ),
  ),
);

export default useMenuStore;
