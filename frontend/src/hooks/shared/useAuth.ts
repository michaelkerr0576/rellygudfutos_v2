import { Auth, AuthState } from '@/types/store/auth.types';

import useAuthStore from '../stores/useAuthStore';

export interface UseAuth {
  auth: Auth;
  setAuth: (auth: Auth) => void;
}

export default function useAuth(): UseAuth {
  const { auth, setAuth } = useAuthStore(
    (state): AuthState => ({
      auth: state.auth,
      setAuth: state.setAuth,
    }),
  );

  return {
    auth,
    setAuth,
  };
}
