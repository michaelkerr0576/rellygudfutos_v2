import { RegisterOptions } from 'react-hook-form';

import { EMAIL_ADDRESS_REGEX } from '@/constants/regex.constants';
import { invalidRegexMessage, maxCharactersMessage, requiredMessage } from '@/utils/validationMessage.utils';

/* 
 $ loginFormUtils
  - emailFieldValidationRules
  - passwordFieldValidationRules
*/

export const emailFieldValidationRules: RegisterOptions = {
  maxLength: { message: maxCharactersMessage(100), value: 100 },
  pattern: { message: invalidRegexMessage('email'), value: EMAIL_ADDRESS_REGEX },
  required: { message: requiredMessage(), value: true },
};

export const passwordFieldValidationRules: RegisterOptions = {
  maxLength: { message: maxCharactersMessage(100), value: 100 },
  required: { message: requiredMessage(), value: true },
};
