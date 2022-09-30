import { Types } from 'mongoose';

const isObjectEmpty = (object: Record<string, unknown>): boolean => Object.keys(object).length === 0;

const numberToString = (value: string | number | Types.ObjectId): string =>
  typeof value === 'number' || typeof value === 'object' ? value.toString() : value;

const stringToNumber = (value: string | number): number =>
  typeof value === 'string' ? parseInt(value, 10) : value;

const generalUtils = {
  isObjectEmpty,
  numberToString,
  stringToNumber,
};

export default generalUtils;
