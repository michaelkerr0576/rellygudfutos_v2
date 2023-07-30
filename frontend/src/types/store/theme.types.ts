// #region State Enum
export enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
}
// #endregion

// #region State Interfaces
export interface ThemeState {
  colorMode: ColorMode | undefined;
  setColorMode: (colorMode: ColorMode) => void;
}
// #endregion
