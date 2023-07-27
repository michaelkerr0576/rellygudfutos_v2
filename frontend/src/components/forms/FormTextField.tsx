import { Control, Controller } from 'react-hook-form';
import clsx from 'clsx';

import { styled } from '@mui/material/styles';

import TextField, { TextFieldProps } from '../inputs/TextField';

export interface FormTextFieldProps {
  className?: TextFieldProps['className'];
  control: Control<any>;
  endAdornment?: TextFieldProps['endAdornment'];
  label: string;
  name: string;
  startAdornment?: TextFieldProps['startAdornment'];
  type?: TextFieldProps['type'];
  variant?: TextFieldProps['variant'];
}

const StyledTextField = styled(TextField)(({ theme }): { [key: string]: any } => ({
  '&.rgf-formTextField--outlined': {
    height: '95px',
  },
  '&.rgf-formTextField--standard': {
    height: '80px',
  },

  padding: theme.spacing(1, 0),
}));

export default function FormTextField(props: FormTextFieldProps): JSX.Element {
  const {
    className = '',
    control,
    endAdornment = undefined,
    label,
    name,
    startAdornment = undefined,
    type = 'text',
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
      // TODO - switch out rules for prop
      rules={{ required: true }}
      render={({ field: { onChange, ref, value }, fieldState: { error } }): JSX.Element => (
        <StyledTextField
          className={formTextFieldStyles}
          endAdornment={endAdornment}
          // TODO - better validation text
          helperText={error ? 'test error' : ''}
          inputRef={ref}
          isError={!!error}
          label={label}
          onChange={onChange}
          startAdornment={startAdornment}
          type={type}
          value={value}
        />
      )}
    />
  );
}
