import { useQuery } from 'react-query';

import { getPhotos } from '@/services/photos.service';

// TODO - setup types for return usePhotos
export default function usePhotos(): any {
  return useQuery('photos', getPhotos, {
    cacheTime: 30 * (60 * 1000), // 30 mins
    staleTime: 10 * (60 * 1000), // 10 mins
  });
}
