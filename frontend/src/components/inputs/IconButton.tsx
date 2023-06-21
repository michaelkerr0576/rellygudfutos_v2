import clsx from 'clsx';

import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

export const ICON_BUTTON_HEIGHT_WIDTH = '34px';

export interface IconButtonProps {
  ariaLabel: MuiIconButtonProps['aria-label'];
  children: React.ReactNode;
  className?: MuiIconButtonProps['className'];
  edge?: MuiIconButtonProps['edge'];
  onClick: MuiIconButtonProps['onClick'];
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  const { ariaLabel, children, className = '', onClick, edge = false } = props;

  return (
    <MuiIconButton
      aria-label={ariaLabel}
      className={clsx('rgf-iconButton', { [className]: !!className })}
      edge={edge}
      onClick={onClick}
      size="small"
    >
      {children}
    </MuiIconButton>
  );
}
