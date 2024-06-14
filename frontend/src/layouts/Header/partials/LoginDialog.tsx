import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import AccountCircleIcon from '@/assets/icons/AccountCircleIcon';
import LockIcon from '@/assets/icons/LockIcon';
import LoginIcon from '@/assets/icons/LoginIcon';
import VisibilityIcon from '@/assets/icons/VisibilityIcon';
import Dialog from '@/components/dataDisplay/Dialog';
import Form from '@/components/forms/Form';
import FormTextField from '@/components/forms/FormTextField';
import Button from '@/components/inputs/Button';
import IconButton from '@/components/inputs/IconButton';
import useUserLogin from '@/hooks/queries/useUserLogin';
import useMenu from '@/hooks/shared/useMenu';

import { emailFieldValidationRules, passwordFieldValidationRules } from '../utils/loginForm.utils';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginDialog(): JSX.Element {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginUser, isLoading } = useUserLogin();

  const { handleCloseLoginDialog, isLoginDialogOpen } = useMenu();

  const handleOnSubmit: SubmitHandler<LoginFormInput> = async (data): Promise<void> => {
    const { email, password } = data;

    loginUser({ email, password });
  };

  // TODO - move useState hook
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // TODO - move handles to hook
  const handleToggleShowPassword = (): void => setShowPassword((isShown): boolean => !isShown);

  const renderEmailField = (): JSX.Element => (
    <FormTextField
      autoFill="email"
      className="rgf-loginDialog--emailField"
      control={control}
      label="Email"
      name="email"
      startAdornment={<AccountCircleIcon color="secondary" />}
      type="email"
      validationRules={emailFieldValidationRules}
    />
  );

  const renderPasswordField = (): JSX.Element => (
    <FormTextField
      autoFill="current-password"
      className="rgf-loginDialog--passwordField"
      control={control}
      endAdornment={
        <IconButton
          ariaLabel="toggle password visibility"
          className="rgf-dialog--titleMoreOptionsButton"
          onClick={handleToggleShowPassword}
        >
          <VisibilityIcon type={showPassword ? 'off' : 'on'} color="secondary" />
        </IconButton>
      }
      label="Password"
      name="password"
      startAdornment={<LockIcon color="secondary" />}
      type={showPassword ? 'text' : 'password'}
      validationRules={passwordFieldValidationRules}
    />
  );

  const renderDialogActions = (): JSX.Element => (
    <Button
      className="rgf-loginDialog--loginButton"
      isFullWidth
      isLoading={isSubmitting || isLoading}
      onClick={handleSubmit(handleOnSubmit)}
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
      isOpen={isLoginDialogOpen}
      onClose={handleCloseLoginDialog}
      title="Login"
    >
      <Form>
        {renderEmailField()}

        {renderPasswordField()}
      </Form>
    </Dialog>
  );
}
