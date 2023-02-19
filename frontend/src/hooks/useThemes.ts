import { useEffect, useMemo, useState } from 'react';

import { common, grey } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import useStore, { State } from '@/store/store';

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

type ColorMode = 'light' | 'dark';

interface UseThemes {
  colorMode: ColorMode;
  theme: Theme;
  toggleColorMode: () => void;
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
  const { setTheme, theme } = useStore((state): State => ({ setTheme: state.setTheme, theme: state.theme }));

  const doesUserPreferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [colorMode, setColorMode] = useState<ColorMode>(doesUserPreferDarkMode ? 'dark' : 'light');

  const createdTheme = useMemo(
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
        palette: {
          ...(colorMode === 'dark' ? darkTheme.palette : lightTheme.palette),
          mode: colorMode,
        },
      }),
    [colorMode],
  );

  useEffect((): void => {
    setTheme(createdTheme);
  }, [colorMode]);

  const toggleColorMode = (): void =>
    setColorMode((previousColorMode): ColorMode => (previousColorMode === 'light' ? 'dark' : 'light'));

  return {
    colorMode: theme?.palette?.mode || colorMode,
    theme: theme || createdTheme,
    toggleColorMode,
  };
}
