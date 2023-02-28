import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type Variant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps {
  children: React.ReactNode;
  onClick: MuiButtonProps['onClick'];
  variant?: Variant;
}

export default function Button(props: ButtonProps): JSX.Element {
  const { children, onClick, variant = 'primary' } = props;

  const muiVariant = (): MuiButtonProps['variant'] => {
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
    <MuiButton className="rgf_button" fullWidth onClick={onClick} variant={muiVariant()} size="large">
      {children}
    </MuiButton>
  );
}
