import { axiosPublic } from '@/middlewares/axios.middleware';
import { ApiResponse } from '@/types/api/data.types';
import { PostUserLoginRequestPayload, User } from '@/types/api/user.types';

/* 
 $ usersService
  - postUserLogin
*/

export const postUserLogin = async (
  requestPayload: PostUserLoginRequestPayload,
): Promise<ApiResponse<User>> => {
  const { data } = await axiosPublic.post<ApiResponse<User>>('/users/login', requestPayload);

  return data;
};
