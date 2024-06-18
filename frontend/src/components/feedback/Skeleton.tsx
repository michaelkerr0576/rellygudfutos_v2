import clsx from 'clsx';

import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

type Variant = 'circular' | 'rectangular' | 'rounded' | 'text';

export interface SkeletonProps {
  children?: React.ReactNode; // * Optional children to infer width and height from
  className?: MuiSkeletonProps['className'];
  height?: string | number;
  minHeight?: string | number;
  variant?: Variant;
  width?: string | number;
}

interface SkeletonStyleProps {
  styleProps: {
    minHeight: SkeletonProps['minHeight'];
  };
}

const StyledSkeleton = styled(MuiSkeleton, {
  shouldForwardProp: (prop): boolean => prop !== 'styleProps', // * Filter out styleProps prop when forwarding to DOM
})<SkeletonStyleProps>(({ styleProps: { minHeight } }): { [key: string]: any } => ({
  minHeight,
}));

export default function Skeleton(props: SkeletonProps): JSX.Element {
  const {
    children = null,
    className = '',
    height = undefined,
    minHeight = 'inherit',
    variant = 'rounded',
    width = undefined,
  } = props;

  const skeletonStyles = clsx('rgf-skeleton', `rgf-skeleton--${variant}`, {
    [className]: !!className,
  });

  return (
    <StyledSkeleton
      animation="wave"
      className={skeletonStyles}
      height={height}
      styleProps={{ minHeight }}
      variant={variant}
      width={width}
    >
      {children}
    </StyledSkeleton>
  );
}
