const arrayValuesMaxLength =
  (maxLength: number) =>
  (array: any[]): boolean => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].length > maxLength) {
        return false;
      }
    }

    return true;
  };

const arrayValuesRequired = (array: any[]): boolean => array.length > 0;

export default {
  arrayValuesMaxLength,
  arrayValuesRequired,
};
