import { useEffect, useMemo } from 'react';
import { shallow } from 'zustand/shallow';

import { common, grey } from '@mui/material/colors';
import { createTheme, PaletteOptions, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  setTheme: State['setTheme'];
  theme: State['theme'];
}

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
  const { colorMode, setColorMode, setTheme, theme } = useStore(
    (state): UseThemesState => ({
      colorMode: state.colorMode,
      setColorMode: state.setColorMode,
      setTheme: state.setTheme,
      theme: state.theme,
    }),
    shallow,
  );

  const doesUserPreferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const defaultColorMode = doesUserPreferDarkMode ? 'dark' : 'light';

  const getPalette = (): PaletteOptions => {
    if (colorMode) {
      return {
        ...(colorMode === 'dark' ? darkTheme.palette : lightTheme.palette),
        mode: colorMode,
      };
    }

    return {
      ...(defaultColorMode === 'dark' ? darkTheme.palette : lightTheme.palette),
      mode: defaultColorMode,
    };
  };

  const newTheme = useMemo(
    (): Theme =>
      createTheme({
        breakpoints: {
          values: {
            desktop: 1280,
            laptop: 1024,
            mobile: 0,
            tablet: 640,
          },
        },
        palette: getPalette(),
      }),
    [colorMode],
  );

  useEffect((): void => {
    if (colorMode) {
      setTheme(newTheme);
    } else {
      setColorMode(defaultColorMode);
    }
  }, [colorMode]);

  const toggleColorMode = (): void => {
    const toggledColorCode = colorMode === 'light' ? 'dark' : 'light';

    setColorMode(toggledColorCode);
  };

  return {
    colorMode: colorMode || defaultColorMode,
    theme: theme || newTheme,
    toggleColorMode,
  };
}
