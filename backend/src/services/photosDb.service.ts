import { LeanDocument, Types } from 'mongoose';

import PhotoModel from '@/models/Photo.model';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';

const addPhoto = (newPhoto: inf.IPhoto): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.create(newPhoto).then(
    (photo): Promise<LeanDocument<inf.IPhoto> | null> =>
      PhotoModel.findById(photo._id)
        .populate('details.imageTags', 'tag')
        .populate('details.photographer', 'email name')
        .lean()
        .then((addedPhoto): LeanDocument<inf.IPhoto> | null => addedPhoto),
  );

const addPhotos = (newPhotos: inf.IPhoto[]): Promise<LeanDocument<inf.IPhoto[]> | null> =>
  PhotoModel.insertMany(newPhotos).then(
    (photos): Promise<LeanDocument<inf.IPhoto[]> | null> =>
      PhotoModel.find({ _id: photos.map((photo): Types.ObjectId => photo._id) as any })
        .populate('details.imageTags', 'tag')
        .populate('details.photographer', 'email name')
        .lean()
        .then((addedPhotos): LeanDocument<inf.IPhoto[]> | null => addedPhotos),
  );

const checkPhotoExists = (id: Types.ObjectId): Promise<boolean> => PhotoModel.exists({ _id: id });

const countPhotos = (filter: typ.PhotosQuery['filter']): Promise<number> =>
  PhotoModel.countDocuments(filter).then((count): number => count);

const deletePhoto = (id: Types.ObjectId | string): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findByIdAndDelete(id)
    .populate('details.imageTags', 'tag')
    .populate('details.photographer', 'email name')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const findPhoto = (createdAt: Date): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findOne({ createdAt })
    .populate('details.imageTags', 'tag')
    .populate('details.photographer', 'email name')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const getPhoto = (id: Types.ObjectId | string): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findById(id)
    .populate('details.imageTags', 'tag')
    .populate('details.photographer', 'email name')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

const getPhotos = (query: typ.PhotosQuery): Promise<LeanDocument<inf.IPhoto[]>> =>
  PhotoModel.find(query.filter)
    .sort(query.sort)
    .skip(query.startIndex)
    .limit(query.limit)
    .populate('details.imageTags', 'tag')
    .populate('details.photographer', 'email name')
    .lean()
    .then((photos): LeanDocument<inf.IPhoto[]> => photos);

const getRandomPhotos = (limit: number): Promise<LeanDocument<inf.IPhoto[]> | null> =>
  PhotoModel.aggregate([{ $sample: { size: limit } }]).then(
    (randomPhotos): Promise<LeanDocument<inf.IPhoto[]> | null> =>
      PhotoModel.find({ _id: randomPhotos.map((photo): Types.ObjectId => photo._id) as any })
        .populate('details.imageTags', 'tag')
        .populate('details.photographer', 'email name')
        .lean()
        .then((addedPhotos): LeanDocument<inf.IPhoto[]> | null => addedPhotos),
  );

const updatePhoto = (
  id: Types.ObjectId | string,
  updateQuery: Record<string, unknown>,
): Promise<LeanDocument<inf.IPhoto> | null> =>
  PhotoModel.findByIdAndUpdate(id, updateQuery, { new: true, runValidators: true })
    .populate('details.imageTags', 'tag')
    .populate('details.photographer', 'email name')
    .lean()
    .then((photo): LeanDocument<inf.IPhoto> | null => photo);

export default {
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
