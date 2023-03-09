import axios from 'axios';

const API_URL = '/api/photos/';

// TODO - setup interface types for API responses
export const getPhotos = async (): Promise<any> => {
  const { data } = await axios.get(API_URL);

  return data;
};
