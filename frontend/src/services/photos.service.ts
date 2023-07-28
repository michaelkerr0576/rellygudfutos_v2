import { axiosPublic } from '@/middlewares/axios.middleware';
import { ApiResponse, ApiResponsePaginated } from '@/types/api/data.types';
import { GetPhotosQueryParams, Photo } from '@/types/api/photo.types';

/* 
 $ photosService
  - getPhoto
  - getPhotos
*/

const API_BASE_URL = '/api/photos';

export const getPhoto = async (id: string): Promise<ApiResponse<Photo>> => {
  const { data } = await axiosPublic.get<ApiResponse<Photo>>(`${API_BASE_URL}/${id}`);

  return data;
};

export const getPhotos = async (
  queryParams: GetPhotosQueryParams,
): Promise<ApiResponsePaginated<Photo[]>> => {
  const { data } = await axiosPublic.get<ApiResponsePaginated<Photo[]>>(`${API_BASE_URL}`, {
    params: queryParams,
  });

  return data;
};
