import { useQuery, UseQueryResult } from 'react-query';

import { getPhoto } from '@/services/photos.service';
import { ApiErrorResponse, ApiResponse } from '@/ts/api/data';
import { Photo } from '@/ts/api/photos';

interface UsePhotoQueryParam {
  photoId: string;
}

export default function usePhoto({
  photoId,
}: UsePhotoQueryParam): UseQueryResult<ApiResponse<Photo>, ApiErrorResponse> {
  return useQuery({
    cacheTime: 30 * (60 * 1000), // 30 mins
    queryFn: (): Promise<ApiResponse<Photo>> => getPhoto(photoId),
    queryKey: ['photo', photoId],
    retry: 1, // retry once if failure
    staleTime: 10 * (60 * 1000), // 10 mins
  });
}
