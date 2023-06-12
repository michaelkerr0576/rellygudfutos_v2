import { useQuery, UseQueryResult } from 'react-query';

import { getPhotos } from '@/services/photos.service';
import { ApiErrorResponse, ApiResponsePaginated } from '@/ts/api/data';
import { Photo } from '@/ts/api/photos';

export default function usePhotos(): UseQueryResult<ApiResponsePaginated<Photo[]>, ApiErrorResponse> {
  return useQuery({
    cacheTime: 30 * (60 * 1000), // 30 mins
    queryFn: getPhotos,
    queryKey: ['photos'],
    retry: 1, // retry once if failure
    staleTime: 10 * (60 * 1000), // 10 mins
  });
}
