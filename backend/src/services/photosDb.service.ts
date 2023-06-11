import { LeanDocument, Types } from 'mongoose';

import PhotoModel from '@/models/Photo.model';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';

/* 
 $ photosDbService
  - addPhoto
  - addPhotos
  - checkPhotoExists
  - countPhotos
  - deletePhoto
  - findPhoto
  - getPhoto
  - getPhotos
  - getRandomPhotos
  - updatePhoto
*/

export const addPhoto = (newPhoto: inf.Photo): Promise<LeanDocument<inf.Photo> | null> =>
  PhotoModel.create(newPhoto).then(
    (photo): Promise<LeanDocument<inf.Photo> | null> =>
      PhotoModel.findById(photo._id)
        .populate('tags', 'tag')
        .populate('photographer', 'email name')
        .lean()
        .then((addedPhoto): LeanDocument<inf.Photo> | null => addedPhoto),
  );

export const addPhotos = (newPhotos: inf.Photo[]): Promise<LeanDocument<inf.Photo[]> | null> =>
  PhotoModel.insertMany(newPhotos).then(
    (photos): Promise<LeanDocument<inf.Photo[]> | null> =>
      PhotoModel.find({ _id: photos.map((photo): Types.ObjectId => photo._id) as any })
        .populate('tags', 'tag')
        .populate('photographer', 'email name')
        .lean()
        .then((addedPhotos): LeanDocument<inf.Photo[]> | null => addedPhotos),
  );

export const checkPhotoExists = (id: Types.ObjectId): Promise<boolean> => PhotoModel.exists({ _id: id });

export const countPhotos = (filter: typ.PhotosQuery['filter']): Promise<number> =>
  PhotoModel.countDocuments(filter).then((count): number => count);

export const deletePhoto = (id: Types.ObjectId | string): Promise<LeanDocument<inf.Photo> | null> =>
  PhotoModel.findByIdAndDelete(id)
    .populate('tags', 'tag')
    .populate('photographer', 'email name')
    .lean()
    .then((photo): LeanDocument<inf.Photo> | null => photo);

export const findPhoto = (createdAt: Date): Promise<LeanDocument<inf.Photo> | null> =>
  PhotoModel.findOne({ createdAt })
    .populate('tags', 'tag')
    .populate('photographer', 'email name')
    .lean()
    .then((photo): LeanDocument<inf.Photo> | null => photo);

export const getPhoto = (id: Types.ObjectId | string): Promise<LeanDocument<inf.Photo> | null> =>
  PhotoModel.findById(id)
    .populate('tags', 'tag')
    .populate('photographer', 'email name')
    .lean()
    .then((photo): LeanDocument<inf.Photo> | null => photo);

export const getPhotos = (query: typ.PhotosQuery): Promise<LeanDocument<inf.Photo[]>> =>
  PhotoModel.find(query.filter)
    .sort(query.sort)
    .skip(query.startIndex)
    .limit(query.limit)
    .populate('tags', 'tag')
    .populate('photographer', 'email name')
    .lean()
    .then((photos): LeanDocument<inf.Photo[]> => photos);

export const getRandomPhotos = (limit: number): Promise<LeanDocument<inf.Photo[]> | null> =>
  PhotoModel.aggregate([{ $sample: { size: limit } }]).then(
    (randomPhotos): Promise<LeanDocument<inf.Photo[]> | null> =>
      PhotoModel.find({ _id: randomPhotos.map((photo): Types.ObjectId => photo._id) as any })
        .populate('tags', 'tag')
        .populate('photographer', 'email name')
        .lean()
        .then((addedPhotos): LeanDocument<inf.Photo[]> | null => addedPhotos),
  );

export const updatePhoto = (
  id: Types.ObjectId | string,
  updateQuery: Record<string, unknown>,
): Promise<LeanDocument<inf.Photo> | null> =>
  PhotoModel.findByIdAndUpdate(id, updateQuery, { new: true, runValidators: true })
    .populate('tags', 'tag')
    .populate('photographer', 'email name')
    .lean()
    .then((photo): LeanDocument<inf.Photo> | null => photo);
