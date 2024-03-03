import clsx from 'clsx';

import MuiFormControl from '@mui/material/FormControl';
import MuiInputLabel from '@mui/material/InputLabel';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSelect, {
  SelectChangeEvent as MuiSelectChangeEvent,
  SelectProps as MuiSelectProps,
} from '@mui/material/Select';
import { styled } from '@mui/material/styles';

type Option = {
  id: string;
  label: string;
};
type OptionDictionary = Record<string, Option>;

export interface SelectProps {
  className?: MuiSelectProps['className'];
  fieldId: string;
  label: string;
  onChange: (value: string) => void;
  options: OptionDictionary | Option[];
  value: string;
}

const StyledSelect = styled('div')(({ theme }): { [key: string]: any } => ({
  padding: theme.spacing(2, 0),
}));

export default function Select(props: SelectProps): JSX.Element {
  const { className = '', fieldId, label, onChange, options, value } = props;

  const handleChange = (event: MuiSelectChangeEvent): void => onChange(event.target.value);

  const renderMenuItems = (): JSX.Element[] => {
    const renderMenuItem = (option: Option): JSX.Element => (
      <MuiMenuItem key={option.id} value={option.id}>
        {option.label}
      </MuiMenuItem>
    );

    const isArray = Array.isArray(options);
    if (isArray) {
      return options.map(renderMenuItem);
    }

    return Object.values(options).map(renderMenuItem);
  };

  return (
    <StyledSelect className={clsx('rgf-select', { [className]: !!className })}>
      <MuiFormControl fullWidth>
        <MuiInputLabel id={`rgf-${fieldId}-label`}>{label}</MuiInputLabel>
        <MuiSelect
          id={`rgf-${fieldId}`}
          label={label}
          labelId={`rgf-${fieldId}-label`}
          onChange={handleChange}
          value={value}
          variant="outlined"
        >
          {renderMenuItems()}
        </MuiSelect>
      </MuiFormControl>
    </StyledSelect>
  );
}
