import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ColorMode, State } from './types/storeTypes';

const useStore = create<State>()(
  devtools(
    // * Enables Redux devtools
    persist(
      (set, _get): State => ({
        colorMode: undefined,
        isSearchDrawerOpen: false,
        setColorMode: (colorMode: ColorMode): void => set({ colorMode }, false, 'SET_COLOR_MODE'),
        setIsSearchDrawerOpen: (isSearchDrawerOpen: boolean): void =>
          set({ isSearchDrawerOpen }, false, 'SET_IS_SEARCH_DRAWER_OPEN'),
      }),
      {
        // * Persists state to local storage
        name: 'state-storage',
      },
    ),
  ),
);

export default useStore;
