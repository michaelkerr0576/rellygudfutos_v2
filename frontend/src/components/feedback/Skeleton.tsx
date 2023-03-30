import clsx from 'clsx';

import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';

type Variant = 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  children?: MuiSkeletonProps['children']; // * Optional children to infer width and height from
  className?: MuiSkeletonProps['className'];
  height?: string;
  variant?: Variant;
  width?: string;
}

export default function Skeleton(props: SkeletonProps): JSX.Element {
  const {
    children = null,
    className = '',
    height = undefined,
    variant = 'rounded',
    width = undefined,
  } = props;

  return (
    <MuiSkeleton
      animation="wave"
      className={clsx('rgf-skeleton', { [className]: !!className })}
      height={height}
      variant={variant}
      width={width}
    >
      {children}
    </MuiSkeleton>
  );
}
