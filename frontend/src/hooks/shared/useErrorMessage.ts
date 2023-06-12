import { useMemo } from 'react';

import { AlertProps } from '@/components/feedback/Alert';
import { ApiErrorResponse } from '@/ts/api/data';

export interface UseError {
  errorCode: number | null;
  errorMessage: string | null;
  errorSeverity: AlertProps['severity'] | null;
}

export default function useError(
  error: ApiErrorResponse | null,
  defaultErrorMessage = 'There was an unexpected error',
): UseError {
  const getErrorMessage = (message: string): string => {
    if (!message) {
      return defaultErrorMessage;
    }

    // * Remove last character if it is a fullstop = keeps messaging to user consistent
    const isLastCharFullstop = message.lastIndexOf('.') === message.length - 1;
    if (isLastCharFullstop) {
      const removedFullstop = message.substring(0, message.length - 1);
      return removedFullstop;
    }

    return message;
  };

  const getSeverity = (code: number): AlertProps['severity'] => {
    const firstTwoNumbers = String(code).substring(0, 2);
    const is400ErrorCode = firstTwoNumbers === '40';

    if (is400ErrorCode) {
      return 'warning';
    }

    return 'error';
  };

  const { errorCode, errorMessage, errorSeverity } = useMemo((): UseError => {
    const code = error?.response?.status;
    const message = error?.response?.data?.message;

    return {
      errorCode: code || null,
      errorMessage: message ? getErrorMessage(message) : null,
      errorSeverity: code ? getSeverity(code) : null,
    };
  }, [error?.response?.status]);

  return {
    errorCode,
    errorMessage,
    errorSeverity,
  };
}
