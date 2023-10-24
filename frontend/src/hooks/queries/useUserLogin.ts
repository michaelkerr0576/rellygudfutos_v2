import { useMutation, UseMutationResult } from 'react-query';
import { enqueueSnackbar } from 'notistack';

import useMenu from '@/hooks/shared/useMenu';
import { postUserLogin } from '@/services/users.service';
import { ApiErrorResponse, ApiResponseToken } from '@/types/api/data.types';
import { PostUserLoginRequestPayload, User, UserRole } from '@/types/api/user.types';
import { AuthRole } from '@/types/store/auth.types';
import { getErrorMessage } from '@/utils/api.utils';

import useAuth from '../shared/useAuth';

export default function useUserLogin(): UseMutationResult<
  ApiResponseToken<User>,
  ApiErrorResponse,
  PostUserLoginRequestPayload
> {
  const { setAuth } = useAuth();

  const { toggleLoginDialog } = useMenu();

  return useMutation({
    mutationFn: (requestPayload): Promise<ApiResponseToken<User>> => postUserLogin(requestPayload),
    onError(error: ApiErrorResponse): void {
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    },
    onSuccess: (data: ApiResponseToken<User>): void => {
      const {
        data: { role },
        message: successMessage,
        token,
      } = data;
      enqueueSnackbar(successMessage, { variant: 'success' });

      const authRole = role === UserRole.ADMIN ? AuthRole.ADMIN : AuthRole.USER;
      setAuth({ role: authRole, token });

      toggleLoginDialog(false);
    },
  });
}
