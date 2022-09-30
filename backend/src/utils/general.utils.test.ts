import { Types } from 'mongoose';

import generalUtils from './general.utils';

const { isObjectEmpty, numberToString, stringToNumber } = generalUtils;

describe('General Utils', () => {
  describe('Is Object Empty', () => {
    test('Expect empty object to return true', () => {
      const object = {};
      const result = isObjectEmpty(object);

      expect(result).toBe(true);
    });

    test('Expect object with dat to return false', () => {
      const object = { data: 'data' };
      const result = isObjectEmpty(object);

      expect(result).toBe(false);
    });
  });

  describe('Number To String', () => {
    test('Expect to change an Number to a String', () => {
      const number = 123123;
      const result = numberToString(number);

      expect(result).toStrictEqual('123123');
    });

    test('Expect to change an ObjectId to a String', () => {
      const objectIdString = '0000007b4d846028acb6f441';
      const objectId = new Types.ObjectId(objectIdString);
      const result = numberToString(objectId);

      expect(result).toStrictEqual('0000007b4d846028acb6f441');
    });

    test('Expect to keep a String as a string', () => {
      const string = 'imaString';
      const result = numberToString(string);

      expect(result).toStrictEqual('imaString');
    });
  });

  describe('String To Number', () => {
    test('Expect to change an String to a Number', () => {
      const string = '123123';
      const result = stringToNumber(string);

      expect(result).toStrictEqual(123123);
    });

    test('Expect to keep a Number as a Number', () => {
      const number = 123123;
      const result = stringToNumber(number);

      expect(result).toStrictEqual(123123);
    });
  });
});
