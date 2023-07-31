import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Auth, AuthRole, AuthState } from '@/types/store/auth.types';

const useAuthStore = create<AuthState>()(
  // * Enables Redux devtools
  devtools(
    (set, _get): AuthState => ({
      auth: {
        role: AuthRole.READ,
        token: '',
      },
      setAuth: (auth: Auth): void => set({ auth }, false, 'SET_AUTH'),
    }),
  ),
);

export default useAuthStore;
