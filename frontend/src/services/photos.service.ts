import axios from 'axios';

import { GetPhoto, GetPhotos } from '@/ts/api/photos';

const API_BASE_URL = '/api/photos';

export const getPhoto = async (id: string): Promise<GetPhoto> => {
  const { data } = await axios.get<GetPhoto>(`${API_BASE_URL}/${id}`);

  // TODO - remove logs
  console.log('getPhoto');
  console.log(data);
  return data;
};

export const getPhotos = async (): Promise<GetPhotos[]> => {
  const { data } = await axios.get<GetPhotos[]>(API_BASE_URL);

  // TODO - remove logs
  console.log('getPhotos');
  console.log(data);
  return data;
};
