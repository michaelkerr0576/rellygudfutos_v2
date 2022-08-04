import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import * as enm from '@/types/enum.types';

const jwtSecret = process.env.JWT_SECRET || '';

const generateToken = (id: Types.ObjectId, role: enm.UserRole): string =>
  jwt.sign({ id, role }, jwtSecret, { expiresIn: '30d' });

const authUtils = {
  generateToken,
};

export default authUtils;
