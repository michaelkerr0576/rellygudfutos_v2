import { useMemo } from 'react';

import { common, grey } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import CabinSketch from '@/assets/fonts/CabinSketch-Regular.ttf';
import useStore from '@/store/store';
import { ColorMode, State } from '@/store/types/storeTypes';

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
}

export interface UseThemes {
  colorMode: ColorMode;
  theme: Theme;
  toggleColorMode: () => void;
}

interface UseThemesState {
  colorMode: State['colorMode'];
  setColorMode: State['setColorMode'];
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
  h1: {
    fontSize: '2.25rem',
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
    fontSize: '0.83rem',
  },
  h6: {
    fontSize: '0.75rem',
  },
  subtitle1: {
    fontSize: '0.83rem',
  },
};

const components = {
  MuiCssBaseline: {
    styleOverrides: `
      @font-face {
        font-family: 'Cabin Sketch';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(${CabinSketch}) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `,
  },
};

const lightTheme = {
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: grey[400],
    },
  },
};

const darkTheme = {
  palette: {
    primary: {
      main: common.white,
    },
    secondary: {
      main: grey[50],
    },
  },
};

export default function useThemes(): UseThemes {
  const doesUserPreferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const defaultColorMode = doesUserPreferDarkMode ? 'dark' : 'light';

  const { colorMode, setColorMode } = useStore(
    (state): UseThemesState => ({
      colorMode: state.colorMode || defaultColorMode,
      setColorMode: state.setColorMode,
    }),
  );

  const theme = useMemo(
    (): Theme =>
      createTheme({
        breakpoints: { ...breakpoints },
        components: { ...components },
        palette: {
          ...(colorMode === 'dark' ? darkTheme.palette : lightTheme.palette),
          mode: colorMode,
        },
        typography: { ...typography },
      }),
    [colorMode],
  );

  const toggleColorMode = (): void => {
    const toggledColorCode = colorMode === 'light' ? 'dark' : 'light';

    setColorMode(toggledColorCode);
  };

  return {
    colorMode: colorMode as ColorMode,
    theme,
    toggleColorMode,
  };
}
