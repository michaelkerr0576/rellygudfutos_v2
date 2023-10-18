import { Control, Controller, RegisterOptions } from 'react-hook-form';
import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import TextField, { TextFieldProps } from '../inputs/TextField';

export interface FormTextFieldProps {
  className?: TextFieldProps['className'];
  control: Control<any>;
  endAdornment?: TextFieldProps['endAdornment'];
  label: string;
  maxCharacterLength?: TextFieldProps['maxCharacterLength'];
  name: string;
  startAdornment?: TextFieldProps['startAdornment'];
  type?: TextFieldProps['type'];
  validationRules?: RegisterOptions;
  variant?: TextFieldProps['variant'];
}

const StyledTextField = styled(TextField)(({ theme }): { [key: string]: any } => ({
  '.rgf': {
    '&-formTextField': {
      '&--outlined': {
        height: '95px',
      },
      '&--standard': {
        height: '80px',
      },
    },
  },

  padding: theme.spacing(1, 0),
}));

export default function FormTextField(props: FormTextFieldProps): JSX.Element {
  const {
    className = '',
    control,
    endAdornment = undefined,
    label,
    maxCharacterLength = undefined,
    name,
    startAdornment = undefined,
    type = 'text',
    validationRules = undefined,
    variant = 'standard',
  } = props;

  const formTextFieldStyles = clsx('rgf-formTextField', {
    [className]: !!className,
    'rgf-formTextField--outlined': variant === 'outlined',
    'rgf-formTextField--standard': variant === 'standard',
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field: { onChange, ref, value }, fieldState: { error } }): JSX.Element => (
        <StyledTextField
          className={formTextFieldStyles}
          endAdornment={endAdornment}
          helperText={error?.message ? error.message : ''}
          inputRef={ref}
          isError={!!error}
          label={label}
          maxCharacterLength={maxCharacterLength}
          onChange={onChange}
          startAdornment={startAdornment}
          type={type}
          value={value}
        />
      )}
    />
  );
}
