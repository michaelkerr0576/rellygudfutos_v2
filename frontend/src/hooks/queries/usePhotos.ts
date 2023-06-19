import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { PHOTO_LIMIT } from '@/constants/pagination.constants';
import { getPhotos } from '@/services/photos.service';
import { ApiErrorResponse, ApiResponsePaginated } from '@/types/api/data.types';
import { Photo } from '@/types/api/photo.types';

export default function usePhotos(): UseInfiniteQueryResult<ApiResponsePaginated<Photo[]>, ApiErrorResponse> {
  return useInfiniteQuery({
    cacheTime: 30 * (60 * 1000), // 30 mins
    getNextPageParam: (lastPage: ApiResponsePaginated<Photo[]>): number | undefined =>
      lastPage.pagination.next?.page,
    queryFn: ({ pageParam = 1 }): Promise<ApiResponsePaginated<Photo[]>> => getPhotos(PHOTO_LIMIT, pageParam),
    queryKey: ['photos'],
    retry: 1, // retry once if failure
    staleTime: 10 * (60 * 1000), // 10 mins
  });
}
