import clsx from 'clsx';

import MuiDivider, { DividerProps as MuiDividerProps } from '@mui/material/Divider';

type Variant = 'full' | 'partial';

export interface DividerProps {
  className?: MuiDividerProps['className'];
  orientation?: MuiDividerProps['orientation'];
  variant?: Variant;
}

export default function Divider(props: DividerProps): JSX.Element {
  const { className = '', orientation = 'horizontal', variant = 'full' } = props;

  const dividerStyles = clsx('rgf-divider', `rgf-divider--${orientation}`, `rgf-divider--${variant}`, {
    [className]: !!className,
  });

  return (
    <MuiDivider
      className={dividerStyles}
      flexItem
      orientation={orientation}
      variant={variant === 'partial' ? 'middle' : 'fullWidth'}
    />
  );
}
