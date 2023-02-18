import MuiButton from '@mui/material/Button';

export interface ButtonProps {
  children: JSX.Element | string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps): JSX.Element {
  const { children, onClick } = props;

  return <MuiButton onClick={onClick}>{children}</MuiButton>;
}
