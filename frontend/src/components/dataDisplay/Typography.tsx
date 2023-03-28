import clsx from 'clsx';

import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

type Variant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption';

export interface TypographyProps {
  children: React.ReactNode;
  className?: MuiTypographyProps['className'];
  id?: MuiTypographyProps['id'];
  variant?: Variant;
}

export default function Typography(props: TypographyProps): JSX.Element {
  const { children, className = '', id = undefined, variant = 'body' } = props;

  const getVariant = (): MuiTypographyProps['variant'] => {
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
    <MuiTypography
      className={clsx('rgf_typography', { [className]: className })}
      id={id}
      variant={getVariant()}
    >
      {children}
    </MuiTypography>
  );
}
