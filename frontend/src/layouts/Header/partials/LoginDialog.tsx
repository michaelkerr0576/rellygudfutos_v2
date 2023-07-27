import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import AccountCircleIcon from '@/assets/icons/AccountCircleIcon';
import LockIcon from '@/assets/icons/LockIcon';
import LoginIcon from '@/assets/icons/LoginIcon';
import VisibilityIcon from '@/assets/icons/VisibilityIcon';
import Dialog from '@/components/dataDisplay/Dialog';
import FormTextField from '@/components/forms/FormTextField';
import Button from '@/components/inputs/Button';
import IconButton from '@/components/inputs/IconButton';
import useUserLogin from '@/hooks/queries/useUserLogin';
import useMenu from '@/hooks/shared/useMenu';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginDialog(): JSX.Element {
  const { handleSubmit, control } = useForm<LoginFormInput>({
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

  // TODO - move useState hook
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // TODO - move handles to hook
  const handleClickShowPassword = (): void => setShowPassword((isShown): boolean => !isShown);

  const renderEmailField = (): JSX.Element => (
    <FormTextField
      className="rgf-loginDialog--emailField"
      control={control}
      label="Email"
      name="email"
      startAdornment={<AccountCircleIcon color="secondary" />}
      type="email"
    />
  );

  const renderPasswordField = (): JSX.Element => (
    <FormTextField
      className="rgf-loginDialog--passwordField"
      control={control}
      endAdornment={
        <IconButton
          ariaLabel="toggle password visibility"
          className="rgf-dialog--titleMoreOptionsButton"
          onClick={handleClickShowPassword}
        >
          <VisibilityIcon type={showPassword ? 'off' : 'on'} color="secondary" />
        </IconButton>
      }
      label="Password"
      name="password"
      startAdornment={<LockIcon color="secondary" />}
      type={showPassword ? 'text' : 'password'}
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
