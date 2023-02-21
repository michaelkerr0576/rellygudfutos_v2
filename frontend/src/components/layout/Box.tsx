import MuiBox from '@mui/material/Box';

export interface BoxProps {
  ariaRole?: React.AriaRole;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  style?: Array<object | boolean> | object;
}

export default function Box(props: BoxProps): JSX.Element {
  const {
    ariaRole = 'presentation',
    children,
    onClick = (): void => {},
    onKeyDown = (): void => {},
    style = undefined,
  } = props;

  return (
    <MuiBox onClick={onClick} onKeyDown={onKeyDown} role={ariaRole} sx={style}>
      {children}
    </MuiBox>
  );
}
