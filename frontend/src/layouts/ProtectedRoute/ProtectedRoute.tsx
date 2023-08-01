import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@/hooks/shared/useAuth';
import { AuthRole } from '@/types/store/auth.types';

export interface ProtectedRouteProps {
  accessLevel: AuthRole;
}

export default function ProtectedRoute(props: ProtectedRouteProps): JSX.Element {
  const { accessLevel } = props;

  const { hasAdminAccess, hasUserAccess } = useAuth(accessLevel);

  if (hasAdminAccess || hasUserAccess) {
    return <Outlet />;
  }

  return <Navigate replace to="/account/login" />;
}
