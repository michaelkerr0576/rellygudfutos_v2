import clsx from 'clsx';

import MuiAutocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

type Option = {
  id: number;
  label: string;
};

export interface AutocompleteProps {
  className?: string;
  fieldId: string;
  label: string;
  maxCharacterLength?: number;
  noOptionsLabel: string;
  onChange: (values: Option[]) => void;
  options: Option[];
  value: Option[];
}

const StyledAutocomplete = styled('div')(({ theme }): { [key: string]: any } => ({
  padding: theme.spacing(2, 0),
}));

export default function Autocomplete(props: AutocompleteProps): JSX.Element {
  const {
    className = '',
    fieldId,
    label,
    maxCharacterLength = 100,
    noOptionsLabel,
    onChange,
    options,
    value,
  } = props;

  const handleChange = (_event: React.SyntheticEvent<Element, Event>, values: Option[]): void =>
    onChange(values);

  const autocompleteStyles = clsx('rgf-autocomplete', {
    [className]: !!className,
  });

  return (
    <StyledAutocomplete className={autocompleteStyles}>
      <MuiAutocomplete
        disableClearable
        disableCloseOnSelect
        filterSelectedOptions
        fullWidth
        getOptionLabel={(option): string => option.label}
        id={`rgf-${fieldId}`}
        isOptionEqualToValue={(option, propValue): boolean => option.label === propValue.label}
        multiple
        noOptionsText={noOptionsLabel}
        onChange={handleChange}
        options={options}
        renderInput={(params): JSX.Element => (
          <MuiTextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            inputProps={{
              ...params.inputProps,
              maxLength: maxCharacterLength,
            }}
            label={label}
          />
        )}
        value={value}
      />
    </StyledAutocomplete>
  );
}
