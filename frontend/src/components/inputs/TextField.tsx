import { useState } from 'react';
import clsx from 'clsx';

import MuiInputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

import CloseIcon from '@/assets/icons/CloseIcon';

import Box from '../layout/Box';
import Stack from '../layout/Stack';

import IconButton from './IconButton';

type Variant = 'standard' | 'outlined';

export interface TextFieldProps {
  autoFill?: MuiTextFieldProps['autoComplete']; // * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
  className?: MuiTextFieldProps['className'];
  endAdornment?: JSX.Element;
  helperText?: MuiTextFieldProps['helperText'];
  inputRef?: MuiTextFieldProps['inputRef'];
  isClearable?: boolean;
  isError?: MuiTextFieldProps['error'];
  label: string;
  maxCharacterLength?: number;
  onChange: (value: string) => void;
  startAdornment?: JSX.Element;
  type?: MuiTextFieldProps['type'];
  value: string;
  variant?: Variant;
}

const StyledTextField = styled(Stack)(({ theme }): { [key: string]: any } => ({
  // #region Mui Overrides
  '.MuiInputBase-root': {
    '& input:-webkit-autofill': {
      boxShadow: '0 0 0 1000px transparent inset',
      transition: 'background-color 5000s ease-in-out 0s',
      WebkitBoxShadow: '0 0 0 1000px transparent inset',
      WebkitTextFillColor: theme.palette.text.primary,
    },
    '& input:-webkit-autofill:active': {
      boxShadow: '0 0 0 1000px transparent inset',
      WebkitBoxShadow: '0 0 0 1000px transparent inset',
      WebkitTextFillColor: theme.palette.text.primary,
    },
    '& input:-webkit-autofill:focus': {
      boxShadow: '0 0 0 1000px transparent inset',
      WebkitBoxShadow: '0 0 0 1000px transparent inset',
      WebkitTextFillColor: theme.palette.text.primary,
    },
    '& input:-webkit-autofill:hover': {
      boxShadow: '0 0 0 1000px transparent inset',
      WebkitBoxShadow: '0 0 0 1000px transparent inset',
      WebkitTextFillColor: theme.palette.text.primary,
    },

    paddingRight: theme.spacing(1),
  },
  // #endregion
  '.rgf': {
    '&-textField': {
      '&--startAdornmentStandard': {
        display: 'flex',
        paddingTop: theme.spacing(2.5),
      },
    },
  },

  padding: theme.spacing(2, 0),
}));

export default function TextField(props: TextFieldProps): JSX.Element {
  const {
    autoFill = 'on',
    className = '',
    endAdornment = null,
    helperText = '',
    inputRef = null,
    isClearable = false,
    isError = false,
    label,
    maxCharacterLength = 100,
    onChange,
    startAdornment = null,
    type = 'text',
    value,
    variant = 'outlined',
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => onChange(event.target.value);

  const handleFocus = (): void => setIsFocused(true);

  const handleBlur = (): void => setIsFocused(false);

  const handleClear = (): void => onChange('');

  const renderStandardStartAdornment = (): JSX.Element | null => {
    if (variant === 'outlined' || !startAdornment) {
      return null;
    }

    return <Box className="rgf-textField--startAdornmentStandard">{startAdornment}</Box>;
  };

  const renderOutlinedStartAdornment = (): JSX.Element | null => {
    if (variant === 'standard' || !startAdornment) {
      return null;
    }

    return <MuiInputAdornment position="start">{startAdornment}</MuiInputAdornment>;
  };

  const renderEndAdornment = (): JSX.Element | null => {
    const showClearButton = isClearable && isFocused;
    if (showClearButton) {
      return (
        <MuiInputAdornment position="end">
          <IconButton
            ariaLabel="clear"
            className="rgf-textField--endAdornmentClear"
            edge="end"
            onMouseDown={handleClear} // * onClick makes the field lose focus
          >
            <CloseIcon size="small" />
          </IconButton>
        </MuiInputAdornment>
      );
    }

    if (!endAdornment) {
      return null;
    }

    return <MuiInputAdornment position="end">{endAdornment}</MuiInputAdornment>;
  };

  const textFieldStyles = clsx('rgf-textField', `rgf-textField--${variant}`, {
    [className]: !!className,
  });

  return (
    <StyledTextField className={textFieldStyles} spacing={1}>
      {variant === 'standard' && renderStandardStartAdornment()}

      <MuiTextField
        autoComplete={autoFill}
        error={isError}
        fullWidth
        helperText={helperText}
        inputProps={{
          maxLength: maxCharacterLength,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          endAdornment: renderEndAdornment(),
          startAdornment: renderOutlinedStartAdornment(),
        }}
        inputRef={inputRef}
        label={label}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        type={type === 'search' ? 'text' : type}
        value={value}
        variant={variant}
      />
    </StyledTextField>
  );
}
