/* 
 $ validationMessageUtils
  - invalidRegexMessage
  - maxCharactersMessage
  - requiredMessage
*/

export const invalidRegexMessage = (field: string): string => `Invalid ${field}`;

export const maxCharactersMessage = (number: number): string => `Max characters is ${number}`;

export const requiredMessage = (): string => 'Required';
