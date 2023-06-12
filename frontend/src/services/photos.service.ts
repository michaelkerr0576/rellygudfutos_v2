import axios from 'axios';

import { ApiResponse, ApiResponsePaginated } from '@/ts/api/data';
import { Photo } from '@/ts/api/photos';

const API_BASE_URL = '/api/photos';

export const getPhoto = async (id: string): Promise<ApiResponse<Photo>> => {
  const { data } = await axios.get<ApiResponse<Photo>>(`${API_BASE_URL}/${id}`);

  // TODO - remove logs
  console.log('getPhoto');
  console.log(data);
  return data;
};

export const getPhotos = async (): Promise<ApiResponsePaginated<Photo[]>> => {
  const { data } = await axios.get<ApiResponsePaginated<Photo[]>>(API_BASE_URL);

  // TODO - remove logs
  console.log('getPhotos');
  console.log(data);
  return data;
};
