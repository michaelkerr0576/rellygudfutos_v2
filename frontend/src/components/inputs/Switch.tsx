import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';

export interface SwitchProps {
  ariaLabel: MuiSwitchProps['aria-label'];
  edge?: MuiSwitchProps['edge'];
  isChecked: MuiSwitchProps['checked'];
  onChange: MuiSwitchProps['onChange'];
}

export default function Switch(props: SwitchProps): JSX.Element {
  const { ariaLabel, edge = false, isChecked, onChange } = props;

  return (
    <MuiSwitch
      checked={isChecked}
      className="rgf_switch"
      edge={edge}
      inputProps={{
        'aria-labelledby': ariaLabel,
      }}
      onChange={onChange}
    />
  );
}
