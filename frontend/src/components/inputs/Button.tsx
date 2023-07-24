import clsx from 'clsx';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type Variant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps {
  children: React.ReactNode;
  className?: MuiButtonProps['className'];
  endIcon?: JSX.Element;
  isFullWidth?: boolean;
  onClick?: MuiButtonProps['onClick'];
  startIcon?: JSX.Element;
  type?: MuiButtonProps['type'];
  variant?: Variant;
}

export default function Button(props: ButtonProps): JSX.Element {
  const {
    children,
    className = '',
    endIcon = null,
    isFullWidth = false,
    onClick = undefined,
    startIcon = null,
    type = 'button',
    variant = 'primary',
  } = props;

  const getVariant = (): MuiButtonProps['variant'] => {
    switch (variant) {
      case 'secondary':
        return 'outlined';
      case 'tertiary':
        return 'text';
      case 'primary':
      default:
        return 'contained';
    }
  };

  return (
    <MuiButton
      className={clsx('rgf-button', `rgf-button--${variant}`, { [className]: !!className })}
      endIcon={endIcon}
      fullWidth={isFullWidth}
      onClick={onClick}
      size="large"
      startIcon={startIcon}
      type={type}
      variant={getVariant()}
    >
      {children}
    </MuiButton>
  );
}
