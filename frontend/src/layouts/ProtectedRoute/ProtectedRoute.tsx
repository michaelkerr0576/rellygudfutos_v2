import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute(): JSX.Element {
  // TODO - create hook for authenticating user
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
}
