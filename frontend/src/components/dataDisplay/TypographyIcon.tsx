import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import Stack from '../layout/Stack';

export interface TypographyIconProps {
  className?: string;
  endIcon?: JSX.Element;
  startIcon?: JSX.Element;
  typography: JSX.Element;
}

const StyledTypographyIcon = styled(Stack)((): { [key: string]: any } => ({
  '.rgf': {
    '&-typography': {
      width: 'auto',
    },
  },

  display: 'flex',
}));

export default function TypographyIcon(props: TypographyIconProps): JSX.Element {
  const { className = '', endIcon = null, startIcon = null, typography } = props;

  const typographyIconStyles = clsx('rgf-typographyIcon', {
    [className]: !!className,
  });

  return (
    <StyledTypographyIcon alignItems="center" className={typographyIconStyles} spacing={1}>
      {startIcon}
      {typography}
      {endIcon}
    </StyledTypographyIcon>
  );
}
