import clsx from 'clsx';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import CircularProgress from '../feedback/CircularProgress';

type Color = 'primary' | 'secondary';
type Variant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps {
  children: React.ReactNode;
  className?: MuiButtonProps['className'];
  color?: Color;
  endIcon?: JSX.Element;
  isDisabled?: MuiButtonProps['disabled'];
  isFullWidth?: MuiButtonProps['fullWidth'];
  isLoading?: boolean;
  onClick?: MuiButtonProps['onClick'];
  startIcon?: JSX.Element;
  type?: MuiButtonProps['type'];
  variant?: Variant;
}

const StyledMuiButton = styled(MuiButton)(({ theme }): { [key: string]: any } => ({
  fontWeight: theme.typography.fontWeightSemiBold,
}));

export default function Button(props: ButtonProps): JSX.Element {
  const {
    children,
    className = '',
    color = 'primary',
    endIcon = null,
    isDisabled = false,
    isFullWidth = false,
    isLoading = false,
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

  const buttonStyles = clsx('rgf-button', `rgf-button--${variant}`, {
    [className]: !!className,
  });

  return (
    <StyledMuiButton
      className={buttonStyles}
      color={color}
      disabled={isDisabled || isLoading}
      endIcon={endIcon}
      fullWidth={isFullWidth}
      onClick={onClick}
      size="large"
      startIcon={startIcon}
      type={type}
      variant={getVariant()}
    >
      {children}

      {isLoading && <CircularProgress color="inherit" variant="inline" />}
    </StyledMuiButton>
  );
}
