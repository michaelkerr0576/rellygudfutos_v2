import PhotoModel, { IPhoto } from '@/models/Photo.model';

const addPhoto = (newPhoto: IPhoto): Promise<IPhoto> => PhotoModel.create(newPhoto);

const getPhotos = (): Promise<IPhoto[]> =>
  PhotoModel.find()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((result): IPhoto[] => result);

const photosDbService = { addPhoto, getPhotos };

export default photosDbService;
