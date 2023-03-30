import { useQuery, UseQueryResult } from 'react-query';

import { getPhotos } from '@/services/photos.service';
import { GetPhotos } from '@/ts/api/photos';

export default function usePhotos(): UseQueryResult<GetPhotos> {
  return useQuery({
    cacheTime: 30 * (60 * 1000), // 30 mins
    queryFn: getPhotos,
    queryKey: ['photos'],
    staleTime: 10 * (60 * 1000), // 10 mins
  });
}
