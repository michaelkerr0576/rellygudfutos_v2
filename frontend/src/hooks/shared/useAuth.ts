import { Auth, AuthRole, AuthState } from '@/types/store/auth.types';

import useAuthStore from '../stores/useAuthStore';

export interface UseAuth {
  hasAdminAccess: boolean;
  hasReadOnlyAccess: boolean;
  hasUserAccess: boolean;
  isAdmin: boolean;
  isReadOnly: boolean;
  isUser: boolean;
  setAuth: (auth: Auth) => void;
  token: string;
}

export default function useAuth(): UseAuth {
  const { auth, setAuth } = useAuthStore(
    (state): AuthState => ({
      auth: state.auth,
      setAuth: state.setAuth,
    }),
  );

  const { role, token } = auth;

  const isAdmin = role === AuthRole.ADMIN;
  const isUser = role === AuthRole.USER;
  const isReadOnly = role === AuthRole.READ;

  const adminAccessLevels = [AuthRole.ADMIN];
  const userAccessLevels = [AuthRole.ADMIN, AuthRole.USER];
  const readOnlyAccessLevels = [AuthRole.ADMIN, AuthRole.USER, AuthRole.READ];

  const hasAdminAccess = adminAccessLevels.includes(role);
  const hasUserAccess = userAccessLevels.includes(role);
  const hasReadOnlyAccess = readOnlyAccessLevels.includes(role);

  return {
    hasAdminAccess,
    hasReadOnlyAccess,
    hasUserAccess,
    isAdmin,
    isReadOnly,
    isUser,
    setAuth,
    token,
  };
}
