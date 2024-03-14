import clsx from 'clsx';

import { styled } from '@mui/material/styles';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

type Color = 'primary' | 'secondary';
type Variant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption';

export interface TypographyProps {
  align?: MuiTypographyProps['align'];
  children: React.ReactNode;
  className?: MuiTypographyProps['className'];
  color?: Color;
  id?: MuiTypographyProps['id'];
  isParagraph?: boolean;
  maxLines?: number;
  variant?: Variant;
}

const StyledMuiTypography = styled(MuiTypography)((): { [key: string]: any } => ({
  '&.rgf': {
    '&-typography': {
      '&--maxLines': {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitBoxOrient: 'vertical',
      },
      '&--paragraph': {
        marginBottom: 0,
        maxWidth: '60ch', // character width
      },
    },
  },
}));

export default function Typography(props: TypographyProps): JSX.Element {
  const {
    align = 'inherit',
    children,
    className = '',
    color = 'primary',
    id = undefined,
    isParagraph = false,
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

  const typographyStyles = clsx('rgf-typography', `rgf-typography--${variant}`, `rgf-typography--${color}`, {
    'rgf-typography--maxLines': !!maxLines,
    'rgf-typography--paragraph': !!isParagraph,
    // eslint-disable-next-line sort-keys
    [className]: !!className,
  });

  return (
    <StyledMuiTypography
      align={align}
      className={typographyStyles}
      color={color}
      id={id}
      paragraph={isParagraph}
      sx={{ WebkitLineClamp: maxLines ? `${maxLines}` : undefined }}
      variant={getVariant()}
    >
      {children}
    </StyledMuiTypography>
  );
}
