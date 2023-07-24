/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import AccountCircleIcon from '@/assets/icons/AccountCircleIcon';
import LockIcon from '@/assets/icons/LockIcon';
import LoginIcon from '@/assets/icons/LoginIcon';
import VisibilityIcon from '@/assets/icons/VisibilityIcon';
import Button from '@/components/inputs/Button';
import IconButton from '@/components/inputs/IconButton';
import TextField from '@/components/inputs/TextField';
import Grid from '@/components/layout/Grid';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginForm(): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = (data): void => console.log(data);

  // TODO - move to hook
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // TODO - move to hook
  const handleClickShowPassword = (): void => setShowPassword((isShown): boolean => !isShown);

  const renderEmailField = (): JSX.Element => (
    <Controller
      name="email"
      control={control}
      rules={{ required: true }}
      render={({ field }): JSX.Element => (
        <TextField
          {...field}
          hasHelperText
          helperText="test error"
          isError={!!errors?.email}
          label="Email"
          startAdornment={<AccountCircleIcon color="secondary" />}
          type="email"
        />
      )}
    />
  );

  const renderPasswordField = (): JSX.Element => (
    <Controller
      name="password"
      control={control}
      rules={{ required: true }}
      render={({ field }): JSX.Element => (
        <TextField
          {...field}
          endAdornment={
            <IconButton
              ariaLabel="toggle password visibility"
              className="rgf-dialog--titleMoreOptionsButton"
              onClick={handleClickShowPassword}
            >
              <VisibilityIcon type={showPassword ? 'off' : 'on'} color="secondary" />
            </IconButton>
          }
          hasHelperText
          helperText="test error"
          isError={!!errors?.password}
          label="Password"
          startAdornment={<LockIcon color="secondary" />}
          type={showPassword ? 'text' : 'password'}
        />
      )}
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid isContainer>
        <Grid
          mobile={12}
          tablet={10}
          tabletOffset={1}
          laptop={8}
          laptopOffset={2}
          desktop={6}
          desktopOffset={3}
        >
          {renderEmailField()}

          {renderPasswordField()}

          {/* // TODO - move submit button to fixed bottom bar */}
          <Button isFullWidth startIcon={<LoginIcon />} type="submit">
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
