import { LeanDocument, Types } from 'mongoose';

import TagModel, { ITag } from '@/models/Tag.model';
import * as cmn from '@/types/cmn.types';
import * as enm from '@/types/enum.types';

const addTag = (newTag: ITag): Promise<ITag> => TagModel.create(newTag);

const addTagPhotos = (photoId: Types.ObjectId, photoTagIds: Types.ObjectId[]): Promise<cmn.OperationStatus> =>
  TagModel.updateMany(
    { _id: photoTagIds as any },
    {
      $push: { photos: photoId },
    },
  ).then((): cmn.OperationStatus => ({ status: enm.OperationStatus.SUCCESS }));

const addTags = (newTags: ITag[]): Promise<ITag[]> => TagModel.insertMany(newTags);

const checkTagPhotosExist = (photoIds: Types.ObjectId[]): Promise<boolean> =>
  TagModel.exists({ photos: { $in: photoIds } });

const checkTagsExist = (ids: Types.ObjectId[]): Promise<boolean> =>
  TagModel.find({ _id: { $in: ids } }).then((tags): boolean => ids.length === tags.length);

const deleteTag = (id: string): Promise<LeanDocument<ITag> | null> =>
  TagModel.findByIdAndDelete(id)
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<ITag> | null => tag);

const deleteTagPhotos = (
  photoId: Types.ObjectId,
  photoTagIds: Types.ObjectId[],
): Promise<cmn.OperationStatus> =>
  TagModel.updateMany(
    { _id: photoTagIds as any },
    {
      $pull: { photos: photoId },
    },
  ).then((): cmn.OperationStatus => ({ status: enm.OperationStatus.SUCCESS }));

const findTag = (createdAt: Date): Promise<LeanDocument<ITag> | null> =>
  TagModel.findOne({ createdAt })
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<ITag> | null => tag);

const findTags = (ids: Types.ObjectId[]): Promise<LeanDocument<ITag[]>> =>
  TagModel.find({ _id: ids as any })
    .lean()
    .select('-__v')
    .then((tags): LeanDocument<ITag[]> => tags);

const getTag = (id: string): Promise<LeanDocument<ITag> | null> =>
  TagModel.findById(id)
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<ITag> | null => tag);

const getTags = (): Promise<LeanDocument<ITag[]>> =>
  TagModel.find()
    .lean()
    .select('-__v')
    .then((tags): LeanDocument<ITag[]> => tags);

const updateTag = (id: string, updatedTag: ITag): Promise<LeanDocument<ITag> | null> =>
  TagModel.findByIdAndUpdate(id, updatedTag, { new: true, runValidators: true })
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<ITag> | null => tag);

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
