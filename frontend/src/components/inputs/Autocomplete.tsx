import MuiAutocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

type Value = {
  id: number;
  label: string;
};

export interface AutocompleteProps {
  values: Value[];
  onChange: (_event: React.SyntheticEvent<Element, Event>, values: Value[]) => void;
}

const StyledAutocomplete = styled('div')(({ theme }): { [key: string]: any } => ({
  padding: theme.spacing(2, 0),
}));

export default function Autocomplete(props: AutocompleteProps): JSX.Element {
  const { values, onChange } = props;

  return (
    <StyledAutocomplete className="rgf_autocomplete">
      <MuiAutocomplete
        disableClearable
        disableCloseOnSelect
        filterSelectedOptions
        fullWidth
        getOptionLabel={(option): string => option.label}
        id="rgf-autocomplete"
        limitTags={1}
        multiple
        noOptionsText="No tags"
        onChange={onChange}
        options={values}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params): JSX.Element => <MuiTextField {...params} label="Tags" />}
      />
    </StyledAutocomplete>
  );
}
