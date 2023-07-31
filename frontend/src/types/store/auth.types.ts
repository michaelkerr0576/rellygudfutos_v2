// #region State Enum
export enum AuthRole {
  ADMIN = 'admin',
  USER = 'user',
  READ = 'read',
}
// #endregion

// #region State Types
export type Auth = {
  role: AuthRole;
  token: string;
};
// #endregion

// #region State Interfaces
export interface AuthState {
  auth: Auth;
  setAuth: (auth: Auth) => void;
}
// #endregion
