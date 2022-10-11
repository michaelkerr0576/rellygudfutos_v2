import { LeanDocument, Types } from 'mongoose';

import PhotoModel from '@/models/Photo.model';
import * as inf from '@/ts/interfaces/db.interface';

const addPhoto = (newPhoto: inf.IPhoto): Promise<inf.IPhoto> => PhotoModel.create(newPhoto);

const addPhotos = (newPhotos: inf.IPhoto[]): Promise<inf.IPhoto[]> => PhotoModel.insertMany(newPhotos);

const checkPhotoExists = (id: Types.ObjectId): Promise<boolean> => PhotoModel.exists({ _id: id });

const deletePhoto = (id: string): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findByIdAndDelete(id)
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const findPhoto = (createdAt: Date): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findOne({ createdAt })
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const getPhoto = (id: string): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findById(id)
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const getPhotos = (): Promise<LeanDocument<inf.IPhoto[]>> =>
  PhotoModel.find()
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photos): LeanDocument<inf.IPhoto[]> => photos);

const updatePhoto = (id: string, updatedPhoto: inf.IPhoto): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findByIdAndUpdate(id, updatedPhoto, { new: true, runValidators: true })
    .lean()
    .select('-__v')
    .populate('details.imageTags', '-__v -photos')
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const photosDbService = {
  addPhoto,
  addPhotos,
  checkPhotoExists,
  deletePhoto,
  findPhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
};

export default photosDbService;
