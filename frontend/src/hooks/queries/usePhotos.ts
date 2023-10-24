import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { PHOTO_LIMIT } from '@/constants/pagination.constants';
import { getPhotos } from '@/services/photos.service';
import { ApiErrorResponse, ApiResponsePaginated } from '@/types/api/data.types';
import { GetPhotosQueryParams, Photo } from '@/types/api/photo.types';

export default function usePhotos(
  queryParams: GetPhotosQueryParams,
): UseInfiniteQueryResult<ApiResponsePaginated<Photo[]>, ApiErrorResponse> {
  return useInfiniteQuery({
    cacheTime: 30 * (60 * 1000), // 30 mins
    getNextPageParam: (lastPage: ApiResponsePaginated<Photo[]>): number | undefined =>
      lastPage.pagination?.next?.page,
    queryFn: ({ pageParam = 1 }): Promise<ApiResponsePaginated<Photo[]>> =>
      getPhotos({ ...queryParams, limit: PHOTO_LIMIT, page: pageParam }),
    queryKey: ['photos'],
    retry: 1, // retry once if failure
    staleTime: 10 * (60 * 1000), // 10 mins
  });
}
