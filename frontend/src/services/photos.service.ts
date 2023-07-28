import { axiosPublic } from '@/middlewares/axios.middleware';
import { ApiResponse, ApiResponsePaginated } from '@/types/api/data.types';
import { GetPhotosQueryParams, Photo } from '@/types/api/photo.types';

/* 
 $ photosService
  - getPhoto
  - getPhotos
*/

export const getPhoto = async (id: string): Promise<ApiResponse<Photo>> => {
  const { data } = await axiosPublic.get<ApiResponse<Photo>>(`/photos/${id}`);

  return data;
};

export const getPhotos = async (
  queryParams: GetPhotosQueryParams,
): Promise<ApiResponsePaginated<Photo[]>> => {
  const { data } = await axiosPublic.get<ApiResponsePaginated<Photo[]>>('/photos', {
    params: queryParams,
  });

  return data;
};
