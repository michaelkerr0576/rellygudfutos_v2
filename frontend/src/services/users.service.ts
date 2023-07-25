import axios from 'axios';

import { ApiResponse } from '@/types/api/data.types';

const API_BASE_URL = '/api/users';

export const postUserLogin = async (email: string, password: string): Promise<ApiResponse<any>> => {
  const { data } = await axios.post<ApiResponse<any>>(`${API_BASE_URL}/login`, { email, password });

  return data;
};
