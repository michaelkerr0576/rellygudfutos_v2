import clsx from 'clsx';

import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';

type Variant = 'circular' | 'rectangular' | 'rounded' | 'text';

export interface SkeletonProps {
  children?: React.ReactNode; // * Optional children to infer width and height from
  className?: MuiSkeletonProps['className'];
  height?: string | number;
  minHeight?: string | number;
  variant?: Variant;
  width?: string | number;
}

export default function Skeleton(props: SkeletonProps): JSX.Element {
  const {
    children = null,
    className = '',
    height = undefined,
    minHeight = 'inherit',
    variant = 'rounded',
    width = undefined,
  } = props;

  return (
    <MuiSkeleton
      animation="wave"
      className={clsx('rgf-skeleton', `rgf-skeleton--${variant}`, { [className]: !!className })}
      height={height}
      style={{
        minHeight,
      }}
      variant={variant}
      width={width}
    >
      {children}
    </MuiSkeleton>
  );
}
