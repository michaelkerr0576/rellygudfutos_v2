import { Types } from 'mongoose';

import * as con from '@/utils/constants/parsing';

const checkIsObjectEmpty = (object: Record<string, unknown>): boolean => Object.keys(object).length === 0;

const numberToString = (value: string | number | Types.ObjectId): string =>
  typeof value === 'number' || typeof value === 'object' ? value.toString() : value;

const stringToNumber = (value: string | number): number =>
  typeof value === 'string' ? parseInt(value, con.RADIX) : value;

export default {
  checkIsObjectEmpty,
  numberToString,
  stringToNumber,
};
