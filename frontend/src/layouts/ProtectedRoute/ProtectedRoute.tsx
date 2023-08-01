import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@/hooks/shared/useAuth';
import { AuthRole } from '@/types/store/auth.types';

export interface ProtectedRouteProps {
  accessLevel: AuthRole;
}

export default function ProtectedRoute(props: ProtectedRouteProps): JSX.Element {
  const { accessLevel } = props;

  const { hasAdminAccess, hasUserAccess } = useAuth();

  const isAdminProtected = accessLevel === AuthRole.ADMIN;
  const isUserProtected = accessLevel === AuthRole.USER;

  if (isAdminProtected && hasAdminAccess) {
    return <Outlet />;
  }

  if (isUserProtected && (hasAdminAccess || hasUserAccess)) {
    return <Outlet />;
  }

  return <Navigate replace to="/account/login" />;
}
