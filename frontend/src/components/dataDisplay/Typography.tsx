import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

interface TypographyProps {
  children: React.ReactNode;
  variant: MuiTypographyProps['variant'];
}

export default function Typography(props: TypographyProps): JSX.Element {
  const { children, variant } = props;

  return <MuiTypography variant={variant}>{children}</MuiTypography>;
}
