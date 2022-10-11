import { LeanDocument, Types } from 'mongoose';

import TagModel from '@/models/Tag.model';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';

const addTag = (newTag: inf.ITag): Promise<inf.ITag> => TagModel.create(newTag);

const addTagPhotos = (photoId: Types.ObjectId, photoTagIds: Types.ObjectId[]): Promise<typ.QueryStatus> =>
  TagModel.updateMany(
    { _id: photoTagIds as any },
    {
      $push: { photos: photoId },
    },
  ).then((): typ.QueryStatus => ({ status: enm.QueryStatus.SUCCESS }));

const addTags = (newTags: inf.ITag[]): Promise<inf.ITag[]> => TagModel.insertMany(newTags);

const checkTagPhotosExist = (photoIds: Types.ObjectId[]): Promise<boolean> =>
  TagModel.exists({ photos: { $in: photoIds } });

const checkTagsExist = (ids: Types.ObjectId[]): Promise<boolean> =>
  TagModel.find({ _id: { $in: ids } }).then((tags): boolean => ids.length === tags.length);

const deleteTag = (id: string): Promise<LeanDocument<inf.ITag> | null> =>
  TagModel.findByIdAndDelete(id)
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<inf.ITag> | null => tag);

const deleteTagPhotos = (photoId: Types.ObjectId, photoTagIds: Types.ObjectId[]): Promise<typ.QueryStatus> =>
  TagModel.updateMany(
    { _id: photoTagIds as any },
    {
      $pull: { photos: photoId },
    },
  ).then((): typ.QueryStatus => ({ status: enm.QueryStatus.SUCCESS }));

const findTag = (createdAt: Date): Promise<LeanDocument<inf.ITag> | null> =>
  TagModel.findOne({ createdAt })
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<inf.ITag> | null => tag);

const findTags = (ids: Types.ObjectId[]): Promise<LeanDocument<inf.ITag[]>> =>
  TagModel.find({ _id: ids as any })
    .lean()
    .select('-__v')
    .then((tags): LeanDocument<inf.ITag[]> => tags);

const getTag = (id: string): Promise<LeanDocument<inf.ITag> | null> =>
  TagModel.findById(id)
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<inf.ITag> | null => tag);

const getTags = (): Promise<LeanDocument<inf.ITag[]>> =>
  TagModel.find()
    .lean()
    .select('-__v')
    .then((tags): LeanDocument<inf.ITag[]> => tags);

const updateTag = (id: string, updatedTag: inf.ITag): Promise<LeanDocument<inf.ITag> | null> =>
  TagModel.findByIdAndUpdate(id, updatedTag, { new: true, runValidators: true })
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<inf.ITag> | null => tag);

const tagsDbService = {
  addTag,
  addTagPhotos,
  addTags,
  checkTagPhotosExist,
  checkTagsExist,
  deleteTag,
  deleteTagPhotos,
  findTag,
  findTags,
  getTag,
  getTags,
  updateTag,
};

export default tagsDbService;
