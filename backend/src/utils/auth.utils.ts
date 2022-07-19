import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';

const jwtSecret = process.env.JWT_SECRET || '';

const generateToken = (id: Schema.Types.ObjectId): string => jwt.sign({ id }, jwtSecret, { expiresIn: '7d' });

const authUtils = {
  generateToken,
};

export default authUtils;
