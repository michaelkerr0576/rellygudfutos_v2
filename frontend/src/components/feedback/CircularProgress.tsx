import clsx from 'clsx';

import MuiCircularProgress, {
  CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material/CircularProgress';

import Box from '../layout/Box';

export const LOADING_SPINNER_LARGE_SIZE = 64;
export const LOADING_SPINNER_MEDIUM_SIZE = 44;
export const LOADING_SPINNER_SMALL_SIZE = 22;
export const LOADING_PANEL_HEIGHT = 108;

type Variant = 'page' | 'panel' | 'inline';

export interface CircularProgressProps {
  className?: MuiCircularProgressProps['className'];
  variant?: Variant;
}

export default function CircularProgress(props: CircularProgressProps): JSX.Element {
  const { className = '', variant = 'page' } = props;

  const getStyle = (): {
    alignItems?: string;
    display?: string;
    justifyContent?: string;
    left?: string;
    padding?: string;
    height?: number;
    position?: string;
    top?: string;
  } => {
    switch (variant) {
      case 'page':
        return {
          left: `calc(50% - (${LOADING_SPINNER_LARGE_SIZE}/2))`,
          position: 'fixed',
          top: `calc(50% - (${LOADING_SPINNER_LARGE_SIZE}/2))`,
        };
      case 'panel':
        return {
          alignItems: 'center',
          display: 'flex',
          height: LOADING_PANEL_HEIGHT,
          justifyContent: 'center',
        };
      case 'inline':
      default:
        return {
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        };
    }
  };

  const getSize = (): number => {
    switch (variant) {
      case 'page':
        return LOADING_SPINNER_LARGE_SIZE;
      case 'panel':
        return LOADING_SPINNER_MEDIUM_SIZE;
      case 'inline':
      default:
        return LOADING_SPINNER_SMALL_SIZE;
    }
  };

  return (
    <Box
      className={clsx('rgf-circularProgress', `rgf-circularProgress--${variant}`, {
        [className]: !!className,
      })}
      style={getStyle()}
    >
      <MuiCircularProgress size={getSize()} />
    </Box>
  );
}
