import { axiosPublic } from '@/middlewares/axios.middleware';
import { ApiResponse } from '@/types/api/data.types';
import { PostUserLoginRequestPayload, User } from '@/types/api/user.types';

/* 
 $ usersService
  - postUserLogin
*/

const API_BASE_URL = '/api/users';

export const postUserLogin = async (
  requestPayload: PostUserLoginRequestPayload,
): Promise<ApiResponse<User>> => {
  const { data } = await axiosPublic.post<ApiResponse<User>>(`${API_BASE_URL}/login`, requestPayload);

  return data;
};
