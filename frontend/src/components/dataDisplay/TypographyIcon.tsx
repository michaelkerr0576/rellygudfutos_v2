import clsx from 'clsx';

import { styled } from '@mui/material/styles';

export interface TypographyIconProps {
  className?: string;
  endIcon?: JSX.Element;
  startIcon?: JSX.Element;
  typography: JSX.Element;
}

const StyledTypographyIcon = styled('div')(({ theme }): { [key: string]: any } => ({
  '.rgf-typography': {
    padding: theme.spacing(0, 1),
    width: 'auto',
  },

  display: 'flex',
}));

export default function TypographyIcon(props: TypographyIconProps): JSX.Element {
  const { className = '', endIcon = null, startIcon = null, typography } = props;

  return (
    <StyledTypographyIcon className={clsx('rgf-typographyIcon', { [className]: !!className })}>
      {startIcon}
      {typography}
      {endIcon}
    </StyledTypographyIcon>
  );
}
