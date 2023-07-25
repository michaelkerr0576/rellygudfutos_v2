import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import AccountCircleIcon from '@/assets/icons/AccountCircleIcon';
import LockIcon from '@/assets/icons/LockIcon';
import LoginIcon from '@/assets/icons/LoginIcon';
import VisibilityIcon from '@/assets/icons/VisibilityIcon';
import Dialog from '@/components/dataDisplay/Dialog';
import Button from '@/components/inputs/Button';
import IconButton from '@/components/inputs/IconButton';
import TextField from '@/components/inputs/TextField';
import useUserLogin from '@/hooks/queries/useUserLogin';

import useMenu from '../hooks/useMenu';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginDialog(): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginUser } = useUserLogin();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data): Promise<void> => {
    const { email, password } = data;

    loginUser({ email, password });
  };

  const { isLoginDialogOpen, toggleLoginDialog } = useMenu();

  // TODO - move to hook
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // TODO - move to hook
  const handleClickShowPassword = (): void => setShowPassword((isShown): boolean => !isShown);

  const renderEmailField = (): JSX.Element => (
    <Controller
      name="email"
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange } }): JSX.Element => (
        <TextField
          className="rgf-loginDialog--emailField"
          hasHelperText
          helperText={errors?.email ? 'test error' : ''}
          isError={!!errors?.email}
          label="Email"
          onChange={onChange}
          startAdornment={<AccountCircleIcon color="secondary" />}
          type="email"
          value={value}
        />
      )}
    />
  );

  const renderPasswordField = (): JSX.Element => (
    <Controller
      name="password"
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange } }): JSX.Element => (
        <TextField
          className="rgf-loginDialog--passwordField"
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
          helperText={errors?.password ? 'test error' : ''}
          isError={!!errors?.password}
          label="Password"
          onChange={onChange}
          startAdornment={<LockIcon color="secondary" />}
          type={showPassword ? 'text' : 'password'}
          value={value}
        />
      )}
    />
  );

  const renderDialogActions = (): JSX.Element => (
    <Button
      className="rgf-loginDialog--loginButton"
      isFullWidth
      onClick={handleSubmit(onSubmit)}
      startIcon={<LoginIcon />}
      type="submit"
    >
      Login
    </Button>
  );

  return (
    <Dialog
      className="rgf-loginDialog"
      dialogActions={renderDialogActions()}
      setIsOpen={(isOpen): void => toggleLoginDialog(isOpen)}
      isOpen={isLoginDialogOpen}
      title="Login"
    >
      {renderEmailField()}

      {renderPasswordField()}
    </Dialog>
  );
}
