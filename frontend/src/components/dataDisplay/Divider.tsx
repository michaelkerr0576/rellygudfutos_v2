import clsx from 'clsx';

import MuiDivider, { DividerProps as MuiDividerProps } from '@mui/material/Divider';

export interface DividerProps {
  className?: MuiDividerProps['className'];
  orientation?: MuiDividerProps['orientation'];
}

export default function Divider(props: DividerProps): JSX.Element {
  const { className = '', orientation = 'horizontal' } = props;

  const dividerStyles = clsx('rgf-divider', {
    [className]: !!className,
  });

  return (
    <MuiDivider className={dividerStyles} flexItem={orientation === 'vertical'} orientation={orientation} />
  );
}
