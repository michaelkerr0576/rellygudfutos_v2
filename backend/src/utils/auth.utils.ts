import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import * as enm from '@/ts/enums/db.enum';
import * as con from '@/utils/constants/auth';

const jwtSecret = process.env.JWT_SECRET || '';

const generateToken = (id: Types.ObjectId, role: enm.UserRole): string =>
  jwt.sign({ id, role }, jwtSecret, { expiresIn: con.EXPIRES_IN });

export default {
  generateToken,
};
