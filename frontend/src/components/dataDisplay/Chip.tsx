import clsx from 'clsx';

import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';

export interface ChipProps {
  className?: MuiChipProps['className'];
  icon?: MuiChipProps['icon'];
  label: MuiChipProps['label'];
  onClick?: MuiChipProps['onClick'];
  variant?: MuiChipProps['variant'];
}

export default function Chip(props: ChipProps): JSX.Element {
  const { className = '', icon = undefined, label, onClick = undefined, variant = 'filled' } = props;

  return (
    <MuiChip
      className={clsx('rgf-chip', `rgf-chip--${variant}`, { [className]: !!className })}
      icon={icon}
      label={label}
      onClick={onClick}
      variant={variant}
    />
  );
}
