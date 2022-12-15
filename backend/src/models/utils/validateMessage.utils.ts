import { ValidatorProps } from 'mongoose';

/* 
 $ validateMessageUtils
  - maxLengthMessage
  - requiredMessage
*/

export const maxLengthMessage =
  (maxLength: number) =>
  (validator: ValidatorProps): string =>
    `Path \`${validator.path}\` (\`${validator.value}\`) is longer than the maximum allowed length (${maxLength}).`;

export const requiredMessage = (validator: ValidatorProps): string =>
  `Path \`${validator.path}\` is required.`;
