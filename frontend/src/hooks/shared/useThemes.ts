import { useMemo } from 'react';

import { common } from '@mui/material/colors';
import { alpha, createTheme, Theme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ColorMode, ThemeState } from '@/types/store/theme.types';

import useThemeStore from '../stores/useThemeStore';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    // * Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    // * Custom breakpoints
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
  interface Theme {
    typography: TypographyOptions & {
      // * Custom typography
      fontWeightSemiBold: number;
    };
  }
}

export interface UseThemes {
  colorMode: ColorMode;
  handleToggleColorMode: () => void;
  theme: Theme;
}

const breakpoints = {
  values: {
    desktop: 1280,
    laptop: 1024,
    mobile: 0,
    tablet: 640,
  },
};

const typography = {
  fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  fontWeightBold: 700,
  fontWeightLight: 300,
  fontWeightMedium: 500,
  fontWeightRegular: 400,
  fontWeightSemiBold: 600,
  h1: {
    fontSize: '2rem',
  },
  h2: {
    fontSize: '1.5rem',
  },
  h3: {
    fontSize: '1.17rem',
  },
  h4: {
    fontSize: '1rem',
  },
  h5: {
    fontSize: '0.875rem',
  },
  h6: {
    fontSize: '0.75rem',
  },
  subtitle1: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
};

const getPalette = (colorMode: ColorMode | undefined): any => ({
  mode: colorMode,
  primary: {
    main: colorMode === ColorMode.DARK ? alpha(common.white, 0.95) : alpha(common.black, 0.85),
  },
  secondary: {
    main: colorMode === ColorMode.DARK ? alpha(common.white, 0.8) : alpha(common.black, 0.7),
  },
});

export default function useThemes(): UseThemes {
  const doesUserPreferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const defaultColorMode = doesUserPreferDarkMode ? ColorMode.DARK : ColorMode.LIGHT;

  const { colorMode, setColorMode } = useThemeStore(
    (state): ThemeState => ({
      colorMode: state.colorMode || defaultColorMode,
      setColorMode: state.setColorMode,
    }),
  );

  const theme = useMemo(
    (): Theme =>
      createTheme({
        breakpoints,
        palette: getPalette(colorMode),
        typography,
      }),
    [colorMode],
  );

  const handleToggleColorMode = (): void => {
    const toggledColorCode = colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT;
    setColorMode(toggledColorCode);
  };

  return {
    colorMode: colorMode as ColorMode,
    handleToggleColorMode,
    theme,
  };
}
