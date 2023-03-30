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

export interface SelectProps {
  className?: MuiSelectProps['className'];
  fieldId: string;
  label: string;
  onChange: (value: string) => void;
  options: Option[];
  value: string;
}

const StyledSelect = styled('div')(({ theme }): { [key: string]: any } => ({
  padding: theme.spacing(2, 0),
}));

export default function Select(props: SelectProps): JSX.Element {
  const { className = '', fieldId, label, onChange, options, value } = props;

  const handleOnChange = (event: MuiSelectChangeEvent): void => onChange(event.target.value);

  const renderMenuItems = (): JSX.Element[] =>
    options.map(
      (option: Option): JSX.Element => (
        <MuiMenuItem key={option.id} value={option.id}>
          {option.label}
        </MuiMenuItem>
      ),
    );

  return (
    <StyledSelect className={clsx('rgf-select', { [className]: !!className })}>
      <MuiFormControl fullWidth>
        <MuiInputLabel id={`rgf-${fieldId}-label`}>{label}</MuiInputLabel>
        <MuiSelect
          id={`rgf-${fieldId}`}
          label={label}
          labelId={`rgf-${fieldId}-label`}
          onChange={handleOnChange}
          value={value}
          variant="outlined"
        >
          {renderMenuItems()}
        </MuiSelect>
      </MuiFormControl>
    </StyledSelect>
  );
}
