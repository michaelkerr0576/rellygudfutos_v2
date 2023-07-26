import { ApiErrorResponse } from '@/types/api/data.types';

/* 
 $ apiUtils
  - getErrorMessage
*/

export const getErrorMessage = (
  error: ApiErrorResponse,
  defaultErrorMessage = 'There was an unexpected error',
): string => {
  const status = error?.response?.status;
  const errorMessage = error?.response?.data?.message;

  if (status === 500 || !errorMessage) {
    return defaultErrorMessage;
  }

  // * Remove last character if it is a fullstop = keeps messaging to user consistent
  const isLastCharFullstop = errorMessage.lastIndexOf('.') === errorMessage.length - 1;
  if (isLastCharFullstop) {
    const messageRemovedFullstop = errorMessage.substring(0, errorMessage.length - 1);
    return messageRemovedFullstop;
  }

  return errorMessage;
};
