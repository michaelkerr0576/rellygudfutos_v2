import MuiInputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

export interface TextFieldProps {
  label: string;
  endAdornmentIcon?: JSX.Element;
}

const StyledTextField = styled('div')(({ theme }): { [key: string]: any } => ({
  padding: theme.spacing(2, 0),
}));

export default function TextField(props: TextFieldProps): JSX.Element {
  const { endAdornmentIcon = null, label } = props;

  const renderEndAdornment = (): JSX.Element | null => {
    if (!endAdornmentIcon) {
      return null;
    }

    return <MuiInputAdornment position="start">{endAdornmentIcon}</MuiInputAdornment>;
  };

  return (
    <StyledTextField className="rgf_textField">
      <MuiTextField
        fullWidth
        InputProps={{
          endAdornment: renderEndAdornment(),
        }}
        label={label}
        variant="outlined"
      />
    </StyledTextField>
  );
}
