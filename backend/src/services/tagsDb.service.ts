import { LeanDocument, Types } from 'mongoose';

import TagModel from '@/models/Tag.model';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';

const addTag = (newTag: inf.ITag): Promise<LeanDocument<inf.ITag> | null> =>
  TagModel.create(newTag).then(
    (tag): Promise<LeanDocument<inf.ITag> | null> =>
      TagModel.findById(tag._id)
        .lean()
        .then((addedTag): LeanDocument<inf.ITag> | null => addedTag),
  );

const addTagPhotos = (photoId: Types.ObjectId, photoTagIds: Types.ObjectId[]): Promise<typ.QueryStatus> =>
  TagModel.updateMany(
    { _id: photoTagIds as any },
    {
      $push: { photos: photoId },
    },
  ).then((): typ.QueryStatus => ({ status: enm.QueryStatus.SUCCESS }));

const addTags = (newTags: inf.ITag[]): Promise<LeanDocument<inf.ITag[]> | null> =>
  TagModel.insertMany(newTags).then(
    (tags): Promise<LeanDocument<inf.ITag[]> | null> =>
      TagModel.find({ _id: tags.map((tag): any => tag._id) as any })
        .lean()
        .then((addedTags): LeanDocument<inf.ITag[]> | null => addedTags),
  );

const checkTagPhotosExist = (photoIds: Types.ObjectId[]): Promise<boolean> =>
  TagModel.exists({ photos: { $in: photoIds } });

const checkTagsExist = (ids: Types.ObjectId[]): Promise<boolean> =>
  TagModel.find({ _id: { $in: ids } }).then((tags): boolean => ids.length === tags.length);

const deleteTag = (id: string): Promise<LeanDocument<inf.ITag> | null> =>
  TagModel.findByIdAndDelete(id)
    .lean()
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
    .then((tag): LeanDocument<inf.ITag> | null => tag);

const findTags = (ids: Types.ObjectId[]): Promise<LeanDocument<inf.ITag[]>> =>
  TagModel.find({ _id: ids as any })
    .lean()
    .then((tags): LeanDocument<inf.ITag[]> => tags);

const getTag = (id: string): Promise<LeanDocument<inf.ITag> | null> =>
  TagModel.findById(id)
    .lean()
    .then((tag): LeanDocument<inf.ITag> | null => tag);

const getTags = (): Promise<LeanDocument<inf.ITag[]>> =>
  TagModel.find()
    .lean()
    .then((tags): LeanDocument<inf.ITag[]> => tags);

const updateTag = (id: string, updatedTag: inf.ITag): Promise<LeanDocument<inf.ITag> | null> =>
  TagModel.findByIdAndUpdate(id, updatedTag, { new: true, runValidators: true })
    .lean()
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
