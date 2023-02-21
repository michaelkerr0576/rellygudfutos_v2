import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Theme } from '@mui/material/styles';

import { ColorMode, State } from './types/storeTypes';

const useStore = create<State>()(
  devtools(
    // * Enables Redux devtools
    persist(
      (set, _get): State => ({
        colorMode: undefined,
        setColorMode: (colorMode: ColorMode): void => set({ colorMode }, false, 'SET_COLOR_MODE'),
        setTheme: (theme: Theme): void => set({ theme }, false, 'SET_THEME'),
        theme: undefined,
      }),
      {
        // * Persists chosen state to local storage
        name: 'state-storage',
        partialize: (state): Partial<State> => ({ colorMode: state.colorMode }),
      },
    ),
  ),
);

export default useStore;
