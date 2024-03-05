import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { PAGE, PHOTO_LIMIT } from '@/constants/pagination.constants';
import { getPhotos } from '@/services/photos.service';
import { ApiErrorResponse, ApiResponsePaginated } from '@/types/api/data.types';
import { GetPhotosQueryParams, Photo } from '@/types/api/photo.types';

export default function usePhotos(
  queryParams: GetPhotosQueryParams,
): UseInfiniteQueryResult<ApiResponsePaginated<Photo[]>, ApiErrorResponse> {
  const { limit = PHOTO_LIMIT, search, sort, tagIds } = queryParams;

  return useInfiniteQuery({
    cacheTime: 30 * (60 * 1000), // 30 mins
    getNextPageParam: (lastPage: ApiResponsePaginated<Photo[]>): number | undefined =>
      lastPage.pagination?.next?.page,
    queryFn: ({ pageParam = PAGE }): Promise<ApiResponsePaginated<Photo[]>> =>
      getPhotos({ limit, page: pageParam, search, sort, tagIds }),
    queryKey: ['photos', { search, sort, tagIds }],
    retry: 1, // retry once if failure
    staleTime: 10 * (60 * 1000), // 10 mins
  });
}
