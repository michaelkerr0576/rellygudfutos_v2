import { Auth, AuthRole, AuthState } from '@/types/store/auth.types';

import useAuthStore from '../stores/useAuthStore';

export interface UseAuth {
  hasAdminAccess: boolean;
  hasReadOnlyAccess: boolean;
  hasUserAccess: boolean;
  setAuth: (auth: Auth) => void;
}

export default function useAuth(accessLevel = AuthRole.READ): UseAuth {
  const { auth, setAuth } = useAuthStore(
    (state): AuthState => ({
      auth: state.auth,
      setAuth: state.setAuth,
    }),
  );

  const { role } = auth;

  const isAdmin = role === AuthRole.ADMIN;
  const isUser = role === AuthRole.USER;
  const isReadOnly = role === AuthRole.READ;

  const adminAccessLevels = [AuthRole.ADMIN, AuthRole.USER, AuthRole.READ];
  const userAccessLevels = [AuthRole.USER, AuthRole.READ];
  const readOnlyAccessLevels = [AuthRole.READ];

  const hasAdminAccess = isAdmin && adminAccessLevels.includes(accessLevel);
  const hasUserAccess = isUser && userAccessLevels.includes(accessLevel);
  const hasReadOnlyAccess = isReadOnly && readOnlyAccessLevels.includes(accessLevel);

  return {
    hasAdminAccess,
    hasReadOnlyAccess,
    hasUserAccess,
    setAuth,
  };
}
