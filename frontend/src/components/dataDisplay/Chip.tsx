import clsx from 'clsx';

import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

import Tooltip from './Tooltip';

export interface ChipProps {
  className?: MuiChipProps['className'];
  label: string;
  maxCharacterLength?: number;
  onClick?: MuiChipProps['onClick'];
  onDelete?: MuiChipProps['onDelete'];
  startIcon?: MuiChipProps['icon'];
  variant?: MuiChipProps['variant'];
}

const StyledMuiChip = styled(MuiChip)(({ theme }): { [key: string]: any } => ({
  '&.rgf': {
    '&-chip': {
      '&--endIcon': {
        '.MuiChip-label': {
          paddingRight: theme.spacing(0.5),
        },

        paddingRight: theme.spacing(0.5),
      },
      '&--startIcon': {
        '.MuiChip-label': {
          paddingLeft: theme.spacing(0.5),
        },

        paddingLeft: theme.spacing(1),
      },
    },
  },
  // #region Mui Overrides
  '.MuiChip-deleteIcon': {
    color: theme.palette.secondary.light,
    margin: 0,
  },
  // #endregion
}));

export default function Chip(props: ChipProps): JSX.Element {
  const {
    className = '',
    label,
    maxCharacterLength = 15,
    onClick = undefined,
    onDelete = undefined,
    startIcon = undefined,
    variant = 'filled',
  } = props;

  const showTruncatedLabel = label.length > maxCharacterLength;
  const truncatedLabel = showTruncatedLabel ? `${label.slice(0, maxCharacterLength)}...` : label;

  const chipStyles = clsx('rgf-chip', `rgf-chip--${variant}`, {
    'rgf-chip--endIcon': !!onDelete,
    'rgf-chip--startIcon': !!startIcon,
    // eslint-disable-next-line sort-keys
    [className]: !!className,
  });

  const renderChip = (): JSX.Element => (
    <StyledMuiChip
      className={chipStyles}
      icon={startIcon}
      label={truncatedLabel}
      onClick={onClick}
      onDelete={onDelete}
      variant={variant}
    />
  );

  if (showTruncatedLabel) {
    return <Tooltip label={label}>{renderChip()}</Tooltip>;
  }

  return renderChip();
}
