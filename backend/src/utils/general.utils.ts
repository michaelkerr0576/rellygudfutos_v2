const isObjectEmpty = (object: Record<string, unknown>): boolean => Object.keys(object).length === 0;

const generalUtils = {
  isObjectEmpty,
};

export default generalUtils;
