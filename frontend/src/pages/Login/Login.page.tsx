import Page from '@/layouts/Page/Page';

import LoginForm from './partials/LoginForm';

export default function LoginPage(): JSX.Element {
  return (
    <Page pageName="Login">
      <LoginForm />
    </Page>
  );
}
