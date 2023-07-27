import { RegisterOptions } from 'react-hook-form';

import { EMAIL_ADDRESS_REGEX } from '@/constants/regex.constants';

/* 
 $ loginFormUtils
  - emailFieldValidationRules
  - passwordFieldValidationRules
*/

export const emailFieldValidationRules: RegisterOptions = {
  maxLength: { message: 'Max characters 100', value: 100 },
  pattern: { message: 'Invalid email', value: EMAIL_ADDRESS_REGEX },
  required: { message: 'Required', value: true },
};

export const passwordFieldValidationRules: RegisterOptions = {
  maxLength: { message: 'Max characters 100', value: 100 },
  required: { message: 'Required', value: true },
};
