import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ColorMode, ThemeState } from '@/types/store/theme.types';

const useThemeStore = create<ThemeState>()(
  // * Enables Redux devtools
  devtools(
    // * Persists state to local storage
    persist(
      (set, _get): ThemeState => ({
        colorMode: undefined, // * colorMode undefined while waiting for user preference in browser
        setColorMode: (colorMode: ColorMode): void => set({ colorMode }, false, 'SET_COLOR_MODE'),
      }),
      {
        name: 'rgf-state--theme', // * Local storage key
      },
    ),
  ),
);

export default useThemeStore;
