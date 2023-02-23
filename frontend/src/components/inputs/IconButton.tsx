import MuiIconButton from '@mui/material/IconButton';

export interface IconButtonProps {
  ariaLabel: string;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: IconButtonProps): JSX.Element {
  const { ariaLabel, children, onClick } = props;

  return (
    <MuiIconButton aria-label={ariaLabel} className="rgf_iconButton" onClick={onClick}>
      {children}
    </MuiIconButton>
  );
}
