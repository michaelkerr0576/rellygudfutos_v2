import clsx from 'clsx';

import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';

export interface BoxProps {
  ariaLabel?: MuiBoxProps['aria-label'];
  ariaRole?: MuiBoxProps['role'];
  boxRef?: MuiBoxProps['ref'];
  children?: React.ReactNode;
  className?: MuiBoxProps['className'];
  onClick?: MuiBoxProps['onClick'];
}

export default function Box(props: BoxProps): JSX.Element {
  const {
    ariaLabel = '',
    ariaRole = 'presentation',
    boxRef = undefined,
    children = null,
    className = '',
    onClick = undefined,
  } = props;

  const boxStyles = clsx('rgf-box', {
    [className]: !!className,
  });

  return (
    <MuiBox aria-label={ariaLabel} className={boxStyles} onClick={onClick} ref={boxRef} role={ariaRole}>
      {children}
    </MuiBox>
  );
}
