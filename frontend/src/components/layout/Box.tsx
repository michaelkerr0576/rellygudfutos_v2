import clsx from 'clsx';

import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';

export interface BoxProps {
  ariaLabel?: MuiBoxProps['aria-label'];
  ariaRole?: MuiBoxProps['role'];
  children: React.ReactNode;
  className?: MuiBoxProps['className'];
  onClick?: MuiBoxProps['onClick'];
  style?: MuiBoxProps['sx'];
}

export default function Box(props: BoxProps): JSX.Element {
  const {
    ariaLabel = '',
    ariaRole = 'presentation',
    children,
    className = '',
    onClick = (): void => {},
    style = undefined,
  } = props;

  return (
    <MuiBox
      aria-label={ariaLabel}
      className={clsx('rgf_box', { [className]: className })}
      onClick={onClick}
      role={ariaRole}
      sx={style}
    >
      {children}
    </MuiBox>
  );
}
