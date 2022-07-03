import PhotoModel, { IPhoto } from '@/models/Photo.model';

const addPhoto = (newPhoto: IPhoto): Promise<IPhoto> => PhotoModel.create(newPhoto);

const getPhotos = (): Promise<IPhoto[]> => PhotoModel.find().then((result): IPhoto[] => result);

const photosService = { addPhoto, getPhotos };

export default photosService;
