import clsx from 'clsx';

import MuiCircularProgress, {
  CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

import Box from '../layout/Box';

export const LOADING_SPINNER_LARGE_SIZE = 64;
export const LOADING_SPINNER_MEDIUM_SIZE = 44;
export const LOADING_SPINNER_SMALL_SIZE = 22;
export const LOADING_PANEL_HEIGHT = 108;

type Color = 'inherit' | 'secondary';
type Variant = 'page' | 'panel' | 'inline';

export interface CircularProgressProps {
  className?: MuiCircularProgressProps['className'];
  color?: Color;
  variant?: Variant;
}

const StyledCircularProgress = styled(Box)((): { [key: string]: any } => ({
  '&.rgf': {
    '&-circularProgress': {
      '&--inline': {
        left: `calc(50% - (${LOADING_SPINNER_SMALL_SIZE}/2))`,
        position: 'absolute',
        top: `calc(50% - (${LOADING_SPINNER_SMALL_SIZE}/2))`,
      },
      '&--page': {
        bottom: 0,
        height: '100vh',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      '&--panel': {
        height: LOADING_PANEL_HEIGHT,
      },
    },
  },

  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
}));

export default function CircularProgress(props: CircularProgressProps): JSX.Element {
  const { className = '', color = 'secondary', variant = 'page' } = props;

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

  const circularProgressStyles = clsx('rgf-circularProgress', `rgf-circularProgress--${variant}`, {
    [className]: !!className,
  });

  return (
    <StyledCircularProgress className={circularProgressStyles}>
      <MuiCircularProgress color={color} size={getSize()} />
    </StyledCircularProgress>
  );
}
