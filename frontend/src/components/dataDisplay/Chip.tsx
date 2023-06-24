import clsx from 'clsx';

import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';

export interface ChipProps {
  className?: MuiChipProps['className'];
  label: MuiChipProps['label'];
  onClick?: MuiChipProps['onClick'];
  variant?: MuiChipProps['variant'];
}

export default function Chip(props: ChipProps): JSX.Element {
  const { className = '', label, onClick = undefined, variant = 'filled' } = props;

  return (
    <MuiChip
      className={clsx('rgf-chip', `rgf-chip--${variant}`, { [className]: !!className })}
      onClick={onClick}
      label={label}
      variant={variant}
    />
  );
}
