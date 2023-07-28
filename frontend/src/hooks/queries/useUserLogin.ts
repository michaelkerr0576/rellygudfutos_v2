import { useCookies } from 'react-cookie';
import { useMutation, UseMutationResult } from 'react-query';
import { enqueueSnackbar } from 'notistack';

import useMenu from '@/hooks/shared/useMenu';
import { postUserLogin } from '@/services/users.service';
import { ApiErrorResponse, ApiResponse } from '@/types/api/data.types';
import { PostUserLoginRequestPayload, User } from '@/types/api/user.types';
import { getErrorMessage } from '@/utils/api.utils';
import { getFutureDateInDays } from '@/utils/dateTime.utils';

export default function useUserLogin(): UseMutationResult<
  ApiResponse<User>,
  ApiErrorResponse,
  PostUserLoginRequestPayload
> {
  const [, setCookie] = useCookies(['rgf-token']);
  const { toggleLoginDialog } = useMenu();

  return useMutation({
    mutationFn: (requestPayload): Promise<ApiResponse<User>> => postUserLogin(requestPayload),
    onError(error: ApiErrorResponse): void {
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    },
    onSuccess: (data: ApiResponse<User>): void => {
      const successMessage = data.message;
      enqueueSnackbar(successMessage, { variant: 'success' });

      // TODO - might replace with a more secure flow
      const authToken = data?.token;
      const thirtyDays = getFutureDateInDays(30);
      setCookie('rgf-token', authToken, { expires: thirtyDays });

      toggleLoginDialog(false);
    },
  });
}
