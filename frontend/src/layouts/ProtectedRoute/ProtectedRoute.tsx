import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@/hooks/shared/useAuth';
import { AuthRole } from '@/types/store/auth.types';

import useProtectedRoute from './hooks/useProtectedRoute';

export interface ProtectedRouteProps {
  accessLevel: AuthRole;
}

export default function ProtectedRoute(props: ProtectedRouteProps): JSX.Element {
  const { accessLevel } = props;

  const isAdminProtected = accessLevel === AuthRole.ADMIN;
  const isUserProtected = accessLevel === AuthRole.USER;

  const { hasAdminAccess, hasUserAccess } = useAuth();

  useProtectedRoute(hasAdminAccess, hasUserAccess, isAdminProtected, isUserProtected);

  if (isAdminProtected && hasAdminAccess) {
    return <Outlet />;
  }

  if (isUserProtected && hasUserAccess) {
    return <Outlet />;
  }

  return <Navigate replace to="/login" />;
}
