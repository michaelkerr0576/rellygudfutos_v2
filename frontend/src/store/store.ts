import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Theme } from '@mui/material/styles';

export interface State {
  setTheme: (theme: Theme) => void;
  theme: Theme | undefined;
}

const useStore = create<State>()(
  devtools(
    (set, _get): State => ({
      setTheme: (theme: Theme): void => set({ theme }, false, 'SET_THEME'),
      theme: undefined,
    }),
  ),
);

export default useStore;
