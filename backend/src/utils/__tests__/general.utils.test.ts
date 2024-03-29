import { Types } from 'mongoose';

import * as generalUtils from '../general.utils';

describe('General Utils', () => {
  describe('Check Object Is Empty', () => {
    test('Expect empty object to return true', () => {
      const object = {};
      const checkIsObjectEmpty = generalUtils.checkIsObjectEmpty(object);

      expect(checkIsObjectEmpty).toBe(true);
    });

    test('Expect object with data to return false', () => {
      const object = { data: 'data' };
      const checkIsObjectEmpty = generalUtils.checkIsObjectEmpty(object);

      expect(checkIsObjectEmpty).toBe(false);
    });
  });

  describe('Flatten Object', () => {
    test('Expect empty object to return an empty object', () => {
      const object = {};
      const flattenObject = generalUtils.flattenObject(object);

      expect(flattenObject).toStrictEqual({});
    });

    test('Expect nested object to return flattened with object path', () => {
      const object = {
        test1: 'test1',
        test2: { test21: 123, test22: [1, 2, 3] },
        test3: { test31: 'test3' },
      };
      const flattenObject = generalUtils.flattenObject(object);

      expect(flattenObject).toStrictEqual({
        test1: 'test1',
        'test2.test21': 123,
        'test2.test22': [1, 2, 3],
        'test3.test31': 'test3',
      });
    });
  });

  describe('Generate Key', () => {
    test('Expect to generate key', () => {
      const bytes = 3;
      const generateKey = generalUtils.generateKey(bytes);

      expect(generateKey).toHaveLength(6);
      expect(typeof generateKey).toBe('string');
    });
  });

  describe('Number To String', () => {
    test('Expect to change an Number to a String', () => {
      const number = 123123;
      const numberToString = generalUtils.numberToString(number);

      expect(numberToString).toStrictEqual('123123');
    });

    test('Expect to change an ObjectId to a String', () => {
      const objectIdString = '0000007b4d846028acb6f441';
      const objectId = Types.ObjectId(objectIdString);
      const numberToString = generalUtils.numberToString(objectId);

      expect(numberToString).toStrictEqual('0000007b4d846028acb6f441');
    });

    test('Expect to keep a String as a string', () => {
      const string = 'imaString';
      const numberToString = generalUtils.numberToString(string);

      expect(numberToString).toStrictEqual('imaString');
    });
  });

  describe('String To Number', () => {
    test('Expect to change an String to a Number', () => {
      const string = '123123';
      const stringToNumber = generalUtils.stringToNumber(string);

      expect(stringToNumber).toStrictEqual(123123);
    });

    test('Expect to keep a Number as a Number', () => {
      const number = 123123;
      const stringToNumber = generalUtils.stringToNumber(number);

      expect(stringToNumber).toStrictEqual(123123);
    });
  });
});
