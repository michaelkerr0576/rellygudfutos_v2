import { Types } from 'mongoose';

import * as con from '@/utils/constants/parsing';

const checkIsObjectEmpty = (object: Record<string, unknown>): boolean => Object.keys(object).length === 0;

const checkStringIsEmpty = (string: string): boolean =>
  typeof string === 'string' && string.trim().length === 0;

const flattenObject = (object: Record<string, unknown>): Record<string, unknown> => {
  let flattenedObject: Record<string, unknown> = {};

  Object.entries(object).forEach((entry): void => {
    const [key, value] = entry;

    const isNestedObject = value && typeof value === 'object';
    if (isNestedObject) {
      Object.entries(value).forEach((nestedEntry): void => {
        const [nestedKey, nestedValue] = nestedEntry;

        flattenedObject = { ...flattenedObject, [`${key}.${nestedKey}`]: nestedValue };
      });
    } else {
      flattenedObject = { ...flattenedObject, [`${key}`]: value };
    }
  });

  return flattenedObject;
};

const numberToString = (value: string | number | Types.ObjectId): string =>
  typeof value === 'number' || typeof value === 'object' ? value.toString() : value;

const stringToNumber = (value: string | number): number =>
  typeof value === 'string' ? parseInt(value, con.RADIX) : value;

export default {
  checkIsObjectEmpty,
  checkStringIsEmpty,
  flattenObject,
  numberToString,
  stringToNumber,
};
