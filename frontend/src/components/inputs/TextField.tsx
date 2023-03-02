import clsx from 'clsx';

import MuiInputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export interface TextFieldProps {
  className?: MuiTextFieldProps['className'];
  endAdornmentIcon?: JSX.Element;
  label: string;
}

const StyledTextField = styled('div')(({ theme }): { [key: string]: any } => ({
  padding: theme.spacing(2, 0),
}));

export default function TextField(props: TextFieldProps): JSX.Element {
  const { className = '', endAdornmentIcon = null, label } = props;

  const renderEndAdornment = (): JSX.Element | null => {
    if (!endAdornmentIcon) {
      return null;
    }

    return <MuiInputAdornment position="start">{endAdornmentIcon}</MuiInputAdornment>;
  };

  return (
    <StyledTextField className={clsx('rgf_textField', { [className]: className })}>
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
