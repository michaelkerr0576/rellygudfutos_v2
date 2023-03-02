import clsx from 'clsx';

import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

export interface IconButtonProps {
  ariaLabel: MuiIconButtonProps['aria-label'];
  children: React.ReactNode;
  className?: MuiIconButtonProps['className'];
  edge?: MuiIconButtonProps['edge'];
  onClick: MuiIconButtonProps['onClick'];
  padding?: MuiIconButtonProps['size'];
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  const { ariaLabel, children, className = '', onClick, edge = false, padding = undefined } = props;

  return (
    <MuiIconButton
      aria-label={ariaLabel}
      className={clsx('rgf_iconButton', { [className]: className })}
      edge={edge}
      onClick={onClick}
      size={padding}
    >
      {children}
    </MuiIconButton>
  );
}
