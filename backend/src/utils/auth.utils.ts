import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import * as con from '@/constants/auth.constants';
import * as enm from '@/types/enums/db.enum';

/* 
 $ authUtils
  - generateToken
*/

const jwtSecret = process.env.JWT_SECRET || '';

export const generateToken = (id: Types.ObjectId, role: enm.UserRole): string =>
  jwt.sign({ id, role }, jwtSecret, { expiresIn: con.EXPIRES_IN });
