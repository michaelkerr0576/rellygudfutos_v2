import * as utilFixture from '@/tests/fixtures/util.fixture';

import * as validateUtils from '../validate.utils';

describe('Validate Utils', () => {
  describe('Array Values Max Length', () => {
    test('Expect array with one value chars more than maxLength to return false', () => {
      const maxLength = 100;
      const array = [utilFixture.chars101, 'test'];
      const arrayValuesMaxLength = validateUtils.arrayValuesMaxLength(maxLength)(array);

      expect(arrayValuesMaxLength).toBe(false);
    });

    test('Expect array with all values chars less than maxLength to return true', () => {
      const maxLength = 100;
      const array = ['abc', 'test'];
      const arrayValuesMaxLength = validateUtils.arrayValuesMaxLength(maxLength)(array);

      expect(arrayValuesMaxLength).toBe(true);
    });
  });

  describe('Array Values Required', () => {
    test('Expect populated array to return false', () => {
      const array = [] as any;
      const arrayValuesMaxLength = validateUtils.arrayValuesRequired(array);

      expect(arrayValuesMaxLength).toBe(false);
    });

    test('Expect empty array to return true', () => {
      const array = ['abc', 'test'];
      const arrayValuesMaxLength = validateUtils.arrayValuesRequired(array);

      expect(arrayValuesMaxLength).toBe(true);
    });
  });
});
