import axios from 'axios';

import { Photo } from '@/ts/api';

const API_BASE_URL = '/api/photos/';

export const getPhotos = async (): Promise<Photo[]> => {
  const { data } = await axios.get<Photo[]>(API_BASE_URL);

  return data;
};
