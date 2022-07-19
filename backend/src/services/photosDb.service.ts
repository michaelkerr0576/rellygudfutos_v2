import PhotoModel, { IPhoto } from '@/models/Photo.model';

const addPhoto = (newPhoto: IPhoto): Promise<IPhoto> => PhotoModel.create(newPhoto);

const deletePhoto = (id: string): Promise<IPhoto | null> =>
  PhotoModel.findByIdAndDelete(id)
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): IPhoto | null => photo);

const getPhoto = (id: string): Promise<IPhoto | null> =>
  PhotoModel.findById(id)
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): IPhoto | null => photo);

const getPhotos = (): Promise<IPhoto[]> =>
  PhotoModel.find()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photos): IPhoto[] => photos);

const updatePhoto = (id: string, updatedPhoto: IPhoto): Promise<IPhoto | null> =>
  PhotoModel.findByIdAndUpdate(id, updatedPhoto, { new: true })
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): IPhoto | null => photo);

const photosDbService = {
  addPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
};

export default photosDbService;
