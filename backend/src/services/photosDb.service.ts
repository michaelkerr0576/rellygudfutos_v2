import { LeanDocument } from 'mongoose';

import PhotoModel, { IPhoto } from '@/models/Photo.model';

const addPhoto = (newPhoto: IPhoto): Promise<IPhoto> => PhotoModel.create(newPhoto);

const deletePhoto = (id: string): Promise<LeanDocument<IPhoto> | null> =>
  PhotoModel.findByIdAndDelete(id)
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): LeanDocument<IPhoto> | null => photo);

const findPhoto = (createdAt: Date): Promise<LeanDocument<IPhoto> | null> =>
  PhotoModel.findOne({ createdAt })
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): LeanDocument<IPhoto> | null => photo);

const getPhoto = (id: string): Promise<LeanDocument<IPhoto> | null> =>
  PhotoModel.findById(id)
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): LeanDocument<IPhoto> | null => photo);

const getPhotos = (): Promise<LeanDocument<IPhoto[]>> =>
  PhotoModel.find()
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photos): LeanDocument<IPhoto[]> => photos);

const updatePhoto = (id: string, updatedPhoto: IPhoto): Promise<LeanDocument<IPhoto> | null> =>
  PhotoModel.findByIdAndUpdate(id, updatedPhoto, { new: true })
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): LeanDocument<IPhoto> | null => photo);

const photosDbService = {
  addPhoto,
  deletePhoto,
  findPhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
};

export default photosDbService;
