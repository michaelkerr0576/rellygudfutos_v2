import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

type Variant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: Variant;
}

export default function Typography(props: TypographyProps): JSX.Element {
  const { children, variant = 'body' } = props;

  const muiVariant = (): MuiTypographyProps['variant'] => {
    switch (variant) {
      case 'subtitle':
        return 'subtitle1';
      case 'body':
        return 'body1';
      default:
        return variant;
    }
  };

  return (
    <MuiTypography className="rgf_typography" variant={muiVariant()}>
      {children}
    </MuiTypography>
  );
}
