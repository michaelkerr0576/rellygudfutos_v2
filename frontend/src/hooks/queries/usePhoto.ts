import { useQuery, UseQueryResult } from 'react-query';

import { getPhoto } from '@/services/photos.service';
import { GetPhoto } from '@/ts/api/photos';

interface UsePhotoQueryParam {
  photoId: string;
}

export default function usePhoto({ photoId }: UsePhotoQueryParam): UseQueryResult<GetPhoto> {
  return useQuery({
    cacheTime: 30 * (60 * 1000), // 30 mins
    queryFn: (): Promise<GetPhoto> => getPhoto(photoId),
    queryKey: ['photo', photoId],
    staleTime: 10 * (60 * 1000), // 10 mins
  });
}
