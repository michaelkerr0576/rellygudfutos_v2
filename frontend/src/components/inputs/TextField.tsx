import clsx from 'clsx';

import MuiInputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export interface TextFieldProps {
  className?: MuiTextFieldProps['className'];
  endAdornmentIcon?: JSX.Element;
  label: string;
  onChange: (value: string) => void;
  value: string;
}

const StyledTextField = styled('div')(({ theme }): { [key: string]: any } => ({
  padding: theme.spacing(2, 0),
}));

export default function TextField(props: TextFieldProps): JSX.Element {
  const { className = '', endAdornmentIcon = null, label, onChange, value } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => onChange(event.target.value);

  const renderEndAdornment = (): JSX.Element | null => {
    if (!endAdornmentIcon) {
      return null;
    }

    return <MuiInputAdornment position="start">{endAdornmentIcon}</MuiInputAdornment>;
  };

  return (
    <StyledTextField className={clsx('rgf-textField', { [className]: !!className })}>
      <MuiTextField
        fullWidth
        InputProps={{
          endAdornment: renderEndAdornment(),
        }}
        label={label}
        onChange={handleOnChange}
        value={value}
        variant="outlined"
      />
    </StyledTextField>
  );
}
