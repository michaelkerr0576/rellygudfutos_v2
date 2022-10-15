import { LeanDocument, Types } from 'mongoose';

import PhotoModel from '@/models/Photo.model';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';

const addPhoto = (newPhoto: inf.IPhoto): Promise<inf.IPhoto> => PhotoModel.create(newPhoto);

const addPhotos = (newPhotos: inf.IPhoto[]): Promise<inf.IPhoto[]> => PhotoModel.insertMany(newPhotos);

const checkPhotoExists = (id: Types.ObjectId): Promise<boolean> => PhotoModel.exists({ _id: id });

const deletePhoto = (id: string): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findByIdAndDelete(id)
    .populate('details.imageTags')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const findPhoto = (createdAt: Date): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findOne({ createdAt })
    .populate('details.imageTags')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const getPhoto = (id: string): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findById(id)
    .populate('details.imageTags')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const getPhotos = (query: typ.PhotosQuery): Promise<LeanDocument<inf.IPhoto[]>> =>
  PhotoModel.find(query.filter)
    .sort(query.sort)
    .skip(query.startIndex)
    .limit(query.limit)
    .populate('details.imageTags')
    .lean()
    .then((photos): LeanDocument<inf.IPhoto[]> => photos);

const getRandomPhotos = (limit: number): Promise<LeanDocument<inf.IPhoto[]>> =>
  PhotoModel.aggregate([{ $sample: { size: limit } }]).then(
    (randomPhotos): Promise<LeanDocument<inf.IPhoto[]>> =>
      PhotoModel.populate(randomPhotos, {
        path: 'details.imageTags',
      }).then((photos): LeanDocument<inf.IPhoto[]> => photos),
  );

const updatePhoto = (id: string, updatedPhoto: inf.IPhoto): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findByIdAndUpdate(id, updatedPhoto, { new: true, runValidators: true })
    .populate('details.imageTags')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const photosDbService = {
  addPhoto,
  addPhotos,
  checkPhotoExists,
  deletePhoto,
  findPhoto,
  getPhoto,
  getPhotos,
  getRandomPhotos,
  updatePhoto,
};

export default photosDbService;
