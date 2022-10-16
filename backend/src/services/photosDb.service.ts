import { LeanDocument, Types } from 'mongoose';

import PhotoModel from '@/models/Photo.model';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';

const addPhoto = (newPhoto: inf.IPhoto): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.create(newPhoto).then(
    (photo): Promise<LeanDocument<inf.IPhoto> | null> =>
      PhotoModel.findById(photo._id)
        .populate('details.imageTags', '-__v -photos -createdAt -updatedAt')
        .lean()
        .then((addedPhoto): LeanDocument<inf.IPhoto> | null => addedPhoto),
  );

const addPhotos = (newPhotos: inf.IPhoto[]): Promise<LeanDocument<inf.IPhoto[]> | null> =>
  PhotoModel.insertMany(newPhotos).then(
    (photos): Promise<LeanDocument<inf.IPhoto[]> | null> =>
      PhotoModel.find({ _id: photos.map((photo): any => photo._id) as any })
        .populate('details.imageTags', '-__v -photos -createdAt -updatedAt')
        .lean()
        .then((addedPhotos): LeanDocument<inf.IPhoto[]> | null => addedPhotos),
  );

const checkPhotoExists = (id: Types.ObjectId): Promise<boolean> => PhotoModel.exists({ _id: id });

const countPhotos = (filter: typ.PhotosQuery['filter']): Promise<number> =>
  PhotoModel.countDocuments(filter).then((count): number => count);

const deletePhoto = (id: string): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findByIdAndDelete(id)
    .populate('details.imageTags', '-__v -photos -createdAt -updatedAt')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const findPhoto = (createdAt: Date): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findOne({ createdAt })
    .populate('details.imageTags', '-__v -photos -createdAt -updatedAt')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const getPhoto = (id: string): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findById(id)
    .populate('details.imageTags', '-__v -photos -createdAt -updatedAt')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const getPhotos = (query: typ.PhotosQuery): Promise<LeanDocument<inf.IPhoto[]>> =>
  PhotoModel.find(query.filter)
    .sort(query.sort)
    .skip(query.startIndex)
    .limit(query.limit)
    .populate('details.imageTags', '-__v -photos -createdAt -updatedAt')
    .lean()
    .then((photos): LeanDocument<inf.IPhoto[]> => photos);

const getRandomPhotos = (limit: number): Promise<LeanDocument<inf.IPhoto[]> | null> =>
  PhotoModel.aggregate([{ $sample: { size: limit } }]).then(
    (randomPhotos): Promise<LeanDocument<inf.IPhoto[]> | null> =>
      PhotoModel.find({ _id: randomPhotos.map((photo): any => photo._id) as any })
        .populate('details.imageTags', '-__v -photos -createdAt -updatedAt')
        .lean()
        .then((addedPhotos): LeanDocument<inf.IPhoto[]> | null => addedPhotos),
  );

const updatePhoto = (id: string, updatedPhoto: inf.IPhoto): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findByIdAndUpdate(id, updatedPhoto, { new: true, runValidators: true })
    .populate('details.imageTags', '-__v -photos -createdAt -updatedAt')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const photosDbService = {
  addPhoto,
  addPhotos,
  checkPhotoExists,
  countPhotos,
  deletePhoto,
  findPhoto,
  getPhoto,
  getPhotos,
  getRandomPhotos,
  updatePhoto,
};

export default photosDbService;
