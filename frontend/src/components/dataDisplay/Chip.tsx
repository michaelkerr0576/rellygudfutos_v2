import clsx from 'clsx';

import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

export interface ChipProps {
  className?: MuiChipProps['className'];
  label: MuiChipProps['label'];
  onClick?: MuiChipProps['onClick'];
  startIcon?: MuiChipProps['icon'];
  variant?: MuiChipProps['variant'];
}

const StyledMuiChip = styled(MuiChip)(({ theme }): { [key: string]: any } => ({
  '&.rgf': {
    '&-chip': {
      '&--startIcon': {
        '.MuiChip-label': {
          padding: theme.spacing(0, 1, 0, 0.5),
        },
      },
    },
  },
  // #region Mui Overrides
  '.MuiSvgIcon-root': {
    marginLeft: theme.spacing(1),
  },
  // #endregion
}));

export default function Chip(props: ChipProps): JSX.Element {
  const { className = '', label, onClick = undefined, startIcon = undefined, variant = 'filled' } = props;

  const chipStyles = clsx('rgf-chip', `rgf-chip--${variant}`, {
    'rgf-chip--startIcon': !!startIcon,
    // eslint-disable-next-line sort-keys
    [className]: !!className,
  });

  return (
    <StyledMuiChip
      className={chipStyles}
      icon={startIcon}
      label={label}
      onClick={onClick}
      variant={variant}
    />
  );
}
