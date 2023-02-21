import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';

type HorizontalAlignment = 'start' | 'center' | 'end';

export interface SwitchProps {
  ariaLabel: string;
  horizontalAlignment?: HorizontalAlignment;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
}

export default function Switch(props: SwitchProps): JSX.Element {
  const { ariaLabel, horizontalAlignment = 'center', isChecked, onChange } = props;

  const edge = (): MuiSwitchProps['edge'] => {
    switch (horizontalAlignment) {
      case 'start':
        return 'start';
      case 'end':
        return 'end';
      default:
        return false;
    }
  };

  return (
    <MuiSwitch
      checked={isChecked}
      edge={edge()}
      inputProps={{
        'aria-labelledby': ariaLabel,
      }}
      onChange={onChange}
    />
  );
}
