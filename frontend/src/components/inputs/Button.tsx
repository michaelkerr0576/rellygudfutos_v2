import clsx from 'clsx';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type Variant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps {
  children: React.ReactNode;
  className?: MuiButtonProps['className'];
  onClick: MuiButtonProps['onClick'];
  variant?: Variant;
}

export default function Button(props: ButtonProps): JSX.Element {
  const { children, className = '', onClick, variant = 'primary' } = props;

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
      className={clsx('rgf_button', { [className]: className })}
      fullWidth
      onClick={onClick}
      size="large"
      variant={getVariant()}
    >
      {children}
    </MuiButton>
  );
}
