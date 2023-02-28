import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

export interface IconButtonProps {
  ariaLabel: MuiIconButtonProps['aria-label'];
  children: React.ReactNode;
  edge?: MuiIconButtonProps['edge'];
  onClick: MuiIconButtonProps['onClick'];
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  const { ariaLabel, children, onClick, edge = false } = props;

  return (
    <MuiIconButton aria-label={ariaLabel} className="rgf_iconButton" edge={edge} onClick={onClick}>
      {children}
    </MuiIconButton>
  );
}
