export type ColorMode = 'light' | 'dark';

export interface State {
  colorMode: ColorMode | undefined;
  setColorMode: (colorMode: ColorMode) => void;
}
