export type ColorMode = 'light' | 'dark';

export interface State {
  colorMode: ColorMode | undefined;
  isSearchDrawerOpen: boolean;
  setColorMode: (colorMode: ColorMode) => void;
  setIsSearchDrawerOpen: (isOpen: boolean) => void;
}
