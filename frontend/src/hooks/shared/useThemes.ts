import { useMemo } from 'react';

import { common } from '@mui/material/colors';
import { alpha, Components, createTheme, Theme } from '@mui/material/styles';
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

const getComponents = (colorMode: ColorMode | undefined): Components<Omit<Theme, 'components'>> => ({
  MuiCssBaseline: {
    styleOverrides: {
      '&::-webkit-scrollbar': {
        height: 8,
        width: 8,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundClip: 'content-box',
        backgroundColor: colorMode === ColorMode.DARK ? alpha(common.white, 0.4) : alpha(common.black, 0.4),
        border: 'solid 2px transparent',
        borderRadius: 3.5,
        cursor: 'pointer',
        position: 'fixed',
      },
      '&::-webkit-scrollbar-track': {
        // * boxShadow: (horizontalLength, shadowTop & shadowBottom, blurRadius, spreadRadius)
        boxShadow: `inset 1px 0px 0px 0px ${
          colorMode === ColorMode.DARK ? alpha(common.white, 0.4) : alpha(common.black, 0.4)
        }`,
      },

      '@media only screen and (min-width: 640px)': {
        '&::-webkit-scrollbar': {
          height: 12,
          width: 12,
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 6,
        },
      },
    },
  },
});

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
        components: getComponents(colorMode),
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
