import MuiAutocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

type Option = {
  id: number;
  label: string;
};

export interface AutocompleteProps {
  fieldId: string;
  label: string;
  noOptionsLabel: string;
  onChange: (_event: React.SyntheticEvent<Element, Event>, values: Option[]) => void;
  options: Option[];
  value: Option[];
}

const StyledAutocomplete = styled('div')(({ theme }): { [key: string]: any } => ({
  padding: theme.spacing(2, 0),
}));

export default function Autocomplete(props: AutocompleteProps): JSX.Element {
  const { fieldId, label, noOptionsLabel, onChange, options, value } = props;

  return (
    <StyledAutocomplete className="rgf_autocomplete">
      <MuiAutocomplete
        disableClearable
        disableCloseOnSelect
        filterSelectedOptions
        fullWidth
        getOptionLabel={(option): string => option.label}
        id={`rgf-${fieldId}`}
        multiple
        noOptionsText={noOptionsLabel}
        onChange={onChange}
        options={options}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params): JSX.Element => <MuiTextField {...params} label={label} />}
        value={value}
      />
    </StyledAutocomplete>
  );
}
