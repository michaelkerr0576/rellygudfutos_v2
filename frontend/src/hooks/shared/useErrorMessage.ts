import { useMemo } from 'react';

import { AlertProps } from '@/components/feedback/Alert';
import { ApiErrorResponse } from '@/types/api/data.types';
import { getErrorMessage } from '@/utils/api.utils';

export interface UseError {
  errorCode: number | null;
  errorMessage: string | null;
  errorSeverity: AlertProps['severity'] | null;
}

export interface UseErrorProps {
  error: ApiErrorResponse | null;
  defaultErrorMessage?: string;
}

export default function useError(props: UseErrorProps): UseError {
  const { error, defaultErrorMessage = 'There was an unexpected error' } = props;

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

    return {
      errorCode: code || null,
      errorMessage: code ? getErrorMessage(error, defaultErrorMessage) : null,
      errorSeverity: code ? getSeverity(code) : null,
    };
  }, [error?.response?.status]);

  return {
    errorCode,
    errorMessage,
    errorSeverity,
  };
}
