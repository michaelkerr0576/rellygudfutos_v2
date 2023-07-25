import { useMutation, UseMutationResult } from 'react-query';
import { enqueueSnackbar } from 'notistack';

import useMenu from '@/layouts/Header/hooks/useMenu';
import { postUserLogin } from '@/services/users.service';
import { ApiErrorResponse, ApiResponse } from '@/types/api/data.types';
import { User } from '@/types/api/user.types';
import { getErrorMessage } from '@/utils/api.utils';

interface RequestPayload {
  email: string;
  password: string;
}

export default function useUserLogin(): UseMutationResult<
  ApiResponse<User>,
  ApiErrorResponse,
  RequestPayload
> {
  const { toggleLoginDialog } = useMenu();

  return useMutation({
    mutationFn: (request: RequestPayload): Promise<ApiResponse<User>> =>
      postUserLogin(request.email, request.password),
    onError(error: ApiErrorResponse): void {
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    },
    onSuccess: (data: ApiResponse<User>): void => {
      enqueueSnackbar(data.message, { variant: 'success' });
      // TODO - do something with token
      toggleLoginDialog(false);
    },
  });
}
