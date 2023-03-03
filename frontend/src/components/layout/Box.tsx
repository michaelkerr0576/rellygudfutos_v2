import clsx from 'clsx';

import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';

export interface BoxProps {
  ariaRole?: MuiBoxProps['role'];
  children: React.ReactNode;
  className?: MuiBoxProps['className'];
  onClick?: MuiBoxProps['onClick'];
  onKeyDown?: MuiBoxProps['onKeyDown'];
  style?: MuiBoxProps['sx'];
}

export default function Box(props: BoxProps): JSX.Element {
  const {
    ariaRole = 'presentation',
    children,
    className = '',
    onClick = (): void => {},
    onKeyDown = (): void => {},
    style = undefined,
  } = props;

  return (
    <MuiBox
      className={clsx('rgf_box', { [className]: className })}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={ariaRole}
      sx={style}
    >
      {children}
    </MuiBox>
  );
}
