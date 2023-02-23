import MuiButton from '@mui/material/Button';

export interface ButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps): JSX.Element {
  const { children, onClick } = props;

  return (
    <MuiButton className="rgf_button" onClick={onClick}>
      {children}
    </MuiButton>
  );
}
