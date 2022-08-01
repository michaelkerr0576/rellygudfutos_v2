import { LeanDocument, Schema } from 'mongoose';

import TagModel, { ITag } from '@/models/Tag.model';
import * as enm from '@/types/enum.types';

const addTag = (newTag: ITag): Promise<ITag> => TagModel.create(newTag);

const addTagPhotos = (
  photoId: Schema.Types.ObjectId,
  photoTagIds: Schema.Types.ObjectId[],
): Promise<enm.RequestStatus> =>
  TagModel.updateMany(
    { _id: photoTagIds as any },
    {
      $push: { photos: photoId },
    },
  ).then((): enm.RequestStatus => enm.RequestStatus.SUCCESS);

const addTags = (newTags: ITag[]): Promise<ITag[]> => TagModel.insertMany(newTags);

const checkTagsExist = (ids: string[]): Promise<boolean> =>
  TagModel.find({ _id: { $in: ids as any } }).then((tags): boolean => ids.length === tags.length);

const deleteTag = (id: string): Promise<LeanDocument<ITag> | null> =>
  TagModel.findByIdAndDelete(id)
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<ITag> | null => tag);

const findTag = (createdAt: Date): Promise<LeanDocument<ITag> | null> =>
  TagModel.findOne({ createdAt })
    .lean()
    .select('-__v')
    .then((tag): LeanDocument<ITag> | null => tag);

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
  checkTagsExist,
  deleteTag,
  findTag,
  getTag,
  getTags,
  updateTag,
};

export default tagsDbService;
