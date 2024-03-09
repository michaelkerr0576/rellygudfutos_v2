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
  theme: Theme;
  toggleColorMode: () => void;
}

const breakpoints = {
  values: {
    desktop: 1280,
    laptop: 1024,
    mobile: 0,
    tablet: 640,
  },
};

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      '&::-webkit-scrollbar': {
        width: 7,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundClip: 'content-box',
        backgroundColor: alpha(common.black, 0.4),
        border: 'solid 2px transparent',
        borderRadius: 3.5,
        position: 'fixed',
      },
      '&::-webkit-scrollbar-track': {
        // * boxShadow: (horizontalLength, shadowTop & shadowBottom, blurRadius, spreadRadius)
        boxShadow: `inset 1px 0px 0px 0px ${alpha(common.black, 0.1)}`,
      },

      '@media only screen and (min-width: 640px)': {
        '&::-webkit-scrollbar': {
          width: 12,
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 6,
        },
      },
    },
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

const lightTheme = {
  palette: {
    primary: {
      main: alpha(common.black, 0.85),
    },
    secondary: {
      main: alpha(common.black, 0.7),
    },
  },
  typography,
};

const darkTheme = {
  palette: {
    primary: {
      main: alpha(common.white, 0.95),
    },
    secondary: {
      main: alpha(common.white, 0.8),
    },
  },
  typography,
};

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
        breakpoints: { ...breakpoints },
        components: { ...components },
        palette: {
          ...(colorMode === ColorMode.DARK ? darkTheme.palette : lightTheme.palette),
          mode: colorMode,
        },
        typography: {
          ...(colorMode === ColorMode.DARK ? darkTheme.typography : lightTheme.typography),
        },
      }),
    [colorMode],
  );

  const toggleColorMode = (): void => {
    const toggledColorCode = colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT;
    setColorMode(toggledColorCode);
  };

  return {
    colorMode: colorMode as ColorMode,
    theme,
    toggleColorMode,
  };
}
