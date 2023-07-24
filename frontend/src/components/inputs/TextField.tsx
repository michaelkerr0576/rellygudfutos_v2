import clsx from 'clsx';

import MuiInputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

import Box from '../layout/Box';
import Stack from '../layout/Stack';

type Variant = 'standard' | 'outlined';

export interface TextFieldProps {
  className?: MuiTextFieldProps['className'];
  endAdornment?: JSX.Element;
  hasHelperText?: boolean;
  helperText?: MuiTextFieldProps['helperText'];
  isError?: MuiTextFieldProps['error'];
  label: string;
  onChange: (value: string) => void;
  startAdornment?: JSX.Element;
  type?: MuiTextFieldProps['type'];
  value: string;
  variant?: Variant;
}

const StyledTextField = styled('div')(({ theme }): { [key: string]: any } => ({
  '&.rgf-textField--helperText': {
    height: '70px',
    padding: theme.spacing(0),
  },
  '.MuiInputBase-root': {
    paddingRight: theme.spacing(1),
  },
  '.rgf-textField--startAdornmentIconStandard': {
    display: 'flex',
    paddingTop: theme.spacing(2.5),
  },

  padding: theme.spacing(2, 0),
}));

export default function TextField(props: TextFieldProps): JSX.Element {
  const {
    className = '',
    endAdornment = null,
    hasHelperText = false,
    helperText = '',
    label,
    onChange,
    startAdornment = null,
    type = 'text',
    isError = false,
    value,
    variant = 'standard',
  } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => onChange(event.target.value);

  const renderStandardStartAdornment = (): JSX.Element | null => {
    if (variant === 'outlined' || !startAdornment) {
      return null;
    }

    return <Box className="rgf-textField--startAdornmentIconStandard">{startAdornment}</Box>;
  };

  const renderOutlinedStartAdornment = (): JSX.Element | null => {
    if (variant === 'standard' || !startAdornment) {
      return null;
    }

    return <MuiInputAdornment position="start">{startAdornment}</MuiInputAdornment>;
  };

  const renderEndAdornment = (): JSX.Element | null => {
    if (!endAdornment) {
      return null;
    }

    return <MuiInputAdornment position="end">{endAdornment}</MuiInputAdornment>;
  };

  const textFieldStyles = clsx('rgf-textField', {
    [className]: !!className,
    'rgf-textField--helperText': !!hasHelperText,
  });

  return (
    <StyledTextField className={textFieldStyles}>
      <Stack spacing={1}>
        {variant === 'standard' && renderStandardStartAdornment()}

        <MuiTextField
          error={isError}
          fullWidth
          helperText={helperText}
          InputProps={{
            endAdornment: renderEndAdornment(),
            startAdornment: renderOutlinedStartAdornment(),
          }}
          label={label}
          onChange={handleOnChange}
          type={type}
          value={value}
          variant={variant}
        />
      </Stack>
    </StyledTextField>
  );
}
