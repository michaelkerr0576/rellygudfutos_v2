import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import Stack from '../layout/Stack';

export interface TypographyIconProps {
  className?: string;
  endIcon?: JSX.Element;
  startIcon?: JSX.Element;
  typography: JSX.Element;
}

const StyledTypographyIcon = styled('div')((): { [key: string]: any } => ({
  '.rgf': {
    '&-typography': {
      width: 'auto',
    },
  },

  display: 'flex',
}));

export default function TypographyIcon(props: TypographyIconProps): JSX.Element {
  const { className = '', endIcon = null, startIcon = null, typography } = props;

  return (
    <StyledTypographyIcon className={clsx('rgf-typographyIcon', { [className]: !!className })}>
      <Stack alignItems="center" spacing={1}>
        {startIcon}
        {typography}
        {endIcon}
      </Stack>
    </StyledTypographyIcon>
  );
}
