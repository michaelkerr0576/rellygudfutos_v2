// #region User Enum
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
// #endregion

// #region User Response Types
export interface User {
  _id: string;
  email: string;
  equipment: UserEquipment;
  name: string;
  password: string;
  photos: string[];
  role: UserRole;
}

interface UserEquipment {
  cameras: string[];
  lenses: string[];
}
// #endregion
