import axios from 'axios';

import { PAGE, PHOTO_LIMIT } from '@/constants/pagination.constants';
import { ApiResponse, ApiResponsePaginated } from '@/types/api/data.types';
import { Photo } from '@/types/api/photo.types';

/* 
 $ photosService
  - getPhoto
  - getPhotos
*/

const API_BASE_URL = '/api/photos';

export const getPhoto = async (id: string): Promise<ApiResponse<Photo>> => {
  const { data } = await axios.get<ApiResponse<Photo>>(`${API_BASE_URL}/${id}`);

  return data;
};

export const getPhotos = async (limit = PHOTO_LIMIT, page = PAGE): Promise<ApiResponsePaginated<Photo[]>> => {
  const { data } = await axios.get<ApiResponsePaginated<Photo[]>>(
    `${API_BASE_URL}?limit=${limit}&page=${page}`,
  );

  return data;
};
