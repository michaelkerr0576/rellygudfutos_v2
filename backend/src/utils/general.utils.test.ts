import { Types } from 'mongoose';

import generalUtils from './general.utils';

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

  describe('Number To String', () => {
    test('Expect to change an Number to a String', () => {
      const number = 123123;
      const numberToString = generalUtils.numberToString(number);

      expect(numberToString).toStrictEqual('123123');
    });

    test('Expect to change an ObjectId to a String', () => {
      const objectIdString = '0000007b4d846028acb6f441';
      const objectId = new Types.ObjectId(objectIdString);
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
