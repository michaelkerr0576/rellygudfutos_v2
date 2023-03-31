import { useMemo } from 'react';

import { common, grey } from '@mui/material/colors';
import { alpha, createTheme, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import useStore from '@/store/useStore';
import { ColorMode, State } from '@/ts/store';

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

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: grey[400],
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: `inset 0 0 1px ${grey[600]}`,
        webkitBoxShadow: `inset 0 0 1px ${grey[600]}`,
      },
    },
  },
};

const typography = {
  fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
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
      main: grey[800],
    },
    secondary: {
      main: grey[400],
    },
  },
  typography: {
    ...typography,
    subtitle1: {
      ...typography.subtitle1,
      color: alpha(common.black, 0.6),
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
  typography: {
    ...typography,
    subtitle1: {
      ...typography.subtitle1,
      color: alpha(common.white, 0.7),
    },
  },
};

export default function useThemes(): UseThemes {
  const doesUserPreferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const defaultColorMode = doesUserPreferDarkMode ? ColorMode.DARK : ColorMode.LIGHT;

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
