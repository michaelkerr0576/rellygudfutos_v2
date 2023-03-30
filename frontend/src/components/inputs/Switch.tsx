import clsx from 'clsx';

import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';

export interface SwitchProps {
  ariaLabel: MuiSwitchProps['aria-label'];
  className?: MuiSwitchProps['className'];
  edge?: MuiSwitchProps['edge'];
  isChecked: MuiSwitchProps['checked'];
  onChange: MuiSwitchProps['onChange'];
}

export default function Switch(props: SwitchProps): JSX.Element {
  const { ariaLabel, className = '', edge = false, isChecked, onChange } = props;

  return (
    <MuiSwitch
      checked={isChecked}
      className={clsx('rgf-switch', { [className]: !!className })}
      edge={edge}
      inputProps={{
        'aria-labelledby': ariaLabel,
      }}
      onChange={onChange}
    />
  );
}
