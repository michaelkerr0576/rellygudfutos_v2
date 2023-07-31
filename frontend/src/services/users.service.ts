import { axiosPublic } from '@/middlewares/axios.middleware';
import { ApiResponseToken } from '@/types/api/data.types';
import { PostUserLoginRequestPayload, User } from '@/types/api/user.types';

/* 
 $ usersService
  - postUserLogin
*/

export const postUserLogin = async (
  requestPayload: PostUserLoginRequestPayload,
): Promise<ApiResponseToken<User>> => {
  const { data } = await axiosPublic.post<ApiResponseToken<User>>('/users/login', requestPayload);

  return data;
};
