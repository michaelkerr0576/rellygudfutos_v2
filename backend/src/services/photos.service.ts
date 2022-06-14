import PhotoModel, { IPhoto } from '@/models/Photo.model';

const addPhoto = (form: IPhoto): Promise<IPhoto> => PhotoModel.create(form);

const getPhotos = (): Promise<IPhoto[]> =>
  PhotoModel.find().then((result): IPhoto[] => result);

const photosService = { addPhoto, getPhotos };

export default photosService;
