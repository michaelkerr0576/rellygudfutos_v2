import { Theme } from '@mui/material/styles';

export type ColorMode = 'light' | 'dark';

export interface State {
  colorMode: ColorMode | undefined;
  setColorMode: (colorMode: ColorMode) => void;
  setTheme: (theme: Theme) => void;
  theme: Theme | undefined;
}
