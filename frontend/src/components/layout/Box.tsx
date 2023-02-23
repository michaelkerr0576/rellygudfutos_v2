import MuiBox from '@mui/material/Box';

export interface BoxProps {
  ariaRole?: React.AriaRole;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  style?: Array<object | boolean> | object;
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
    <MuiBox className={className} onClick={onClick} onKeyDown={onKeyDown} role={ariaRole} sx={style}>
      {children}
    </MuiBox>
  );
}
