import clsx from 'clsx';

import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

export const ICON_BUTTON_HEIGHT_WIDTH = 34;

export interface IconButtonProps {
  ariaLabel: MuiIconButtonProps['aria-label'];
  children: React.ReactNode;
  className?: MuiIconButtonProps['className'];
  edge?: MuiIconButtonProps['edge'];
  onClick?: MuiIconButtonProps['onClick'];
  onMouseDown?: MuiIconButtonProps['onMouseDown'];
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  const {
    ariaLabel,
    children,
    className = '',
    edge = false,
    onClick = undefined,
    onMouseDown = undefined,
  } = props;

  const iconButtonStyles = clsx('rgf-iconButton', {
    [className]: !!className,
  });

  return (
    <MuiIconButton
      aria-label={ariaLabel}
      className={iconButtonStyles}
      edge={edge}
      onClick={onClick}
      onMouseDown={onMouseDown}
      size="small"
    >
      {children}
    </MuiIconButton>
  );
}
