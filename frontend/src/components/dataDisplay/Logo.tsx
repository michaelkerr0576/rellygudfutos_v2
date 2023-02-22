import { styled } from '@mui/material/styles';

import Typography, { TypographyProps } from '@/components/dataDisplay/Typography';

type Size = 'medium' | 'small';

export interface LogoProps {
  size?: Size;
}

const StyledLogo = styled('div')((): { [key: string]: any } => ({
  '.MuiTypography-root': {
    fontFamily: 'Cabin Sketch',
  },
}));

export default function Logo(props: LogoProps): JSX.Element {
  const { size = 'medium' } = props;

  const variant = (): TypographyProps['variant'] => {
    switch (size) {
      case 'medium':
        return 'h1';
      default:
        return 'h2';
    }
  };

  return (
    <StyledLogo>
      <Typography variant={variant()}>rellygudfutos</Typography>
    </StyledLogo>
  );
}
