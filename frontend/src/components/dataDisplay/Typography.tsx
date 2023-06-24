import clsx from 'clsx';

import { styled } from '@mui/material/styles';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

type Variant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption';

export interface TypographyProps {
  align?: MuiTypographyProps['align'];
  children: React.ReactNode;
  className?: MuiTypographyProps['className'];
  id?: MuiTypographyProps['id'];
  maxLines?: number;
  variant?: Variant;
}

const StyledMuiTypography = styled(MuiTypography)((): { [key: string]: any } => ({
  '&.rgf-style--maxLines': {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
  },

  width: '100%',
}));

export default function Typography(props: TypographyProps): JSX.Element {
  const {
    align = 'inherit',
    children,
    className = '',
    id = undefined,
    maxLines = undefined,
    variant = 'body',
  } = props;

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

  const typographyStyles = clsx('rgf-typography', `rgf-typography--${variant}`, {
    [className]: !!className,
    'rgf-style--maxLines': !!maxLines,
  });

  return (
    <StyledMuiTypography
      align={align}
      className={typographyStyles}
      id={id}
      sx={{ WebkitLineClamp: maxLines ? `${maxLines}` : undefined }}
      variant={getVariant()}
    >
      {children}
    </StyledMuiTypography>
  );
}
