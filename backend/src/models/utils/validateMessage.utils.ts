import { ValidatorProps } from 'mongoose';

const maxLengthMessage =
  (maxLength: number) =>
  (validator: ValidatorProps): string =>
    `Path \`${validator.path}\` (\`${validator.value}\`) is longer than the maximum allowed length (${maxLength}).`;

const requiredMessage = (validator: ValidatorProps): string => `Path \`${validator.path}\` is required.`;

export default {
  maxLengthMessage,
  requiredMessage,
};
