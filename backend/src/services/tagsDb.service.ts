import { LeanDocument, Types } from 'mongoose';

import TagModel from '@/models/Tag.model';
import * as enm from '@/types/enums/db.enum';
import * as inf from '@/types/interfaces/db.interface';
import * as typ from '@/types/types/db.types';

/* 
 $ tagsDbService
  - addTag
  - addTagPhotos
  - addTags
  - checkTagsExist
  - checkTagsPhotoExist
  - countTags
  - deleteTagPhotos
  - findTag
  - findTags
  - getTag
  - getTags
  - updateTag
  - updateTagPhotos
*/

export const addTag = (newTag: inf.Tag): Promise<LeanDocument<inf.Tag> | null> =>
  TagModel.create(newTag).then(
    (tag): Promise<LeanDocument<inf.Tag> | null> =>
      TagModel.findById(tag._id)
        .lean()
        .then((addedTag): LeanDocument<inf.Tag> | null => addedTag),
  );

export const addTagPhotos = (tagIds: Types.ObjectId[], photoId: Types.ObjectId): Promise<typ.QueryStatus> =>
  TagModel.updateMany(
    { _id: tagIds as any },
    {
      $push: { photos: photoId },
    },
  ).then((): typ.QueryStatus => ({ status: enm.QueryStatus.SUCCESS }));

export const addTags = (newTags: inf.Tag[]): Promise<LeanDocument<inf.Tag[]> | null> =>
  TagModel.insertMany(newTags).then(
    (tags): Promise<LeanDocument<inf.Tag[]> | null> =>
      TagModel.find({ _id: tags.map((tag): Types.ObjectId => tag._id) as any })
        .lean()
        .then((addedTags): LeanDocument<inf.Tag[]> | null => addedTags),
  );

export const checkTagsExist = (ids: Types.ObjectId[]): Promise<boolean> =>
  TagModel.find({ _id: { $in: ids } }).then((tags): boolean => ids.length === tags.length);

export const checkTagsPhotoExist = (photoId: Types.ObjectId): Promise<boolean> =>
  TagModel.exists({ photos: photoId });

export const countTags = (): Promise<number> => TagModel.countDocuments().then((count): number => count);

export const deleteTag = (id: Types.ObjectId | string): Promise<LeanDocument<inf.Tag> | null> =>
  TagModel.findByIdAndDelete(id)
    .lean()
    .then((tag): LeanDocument<inf.Tag> | null => tag);

export const deleteTagPhotos = (photoId: Types.ObjectId): Promise<typ.QueryStatus> =>
  TagModel.updateMany(
    { photos: photoId },
    {
      $pull: { photos: photoId },
    },
  ).then((): typ.QueryStatus => ({ status: enm.QueryStatus.SUCCESS }));

export const findTag = (createdAt: Date): Promise<LeanDocument<inf.Tag> | null> =>
  TagModel.findOne({ createdAt })
    .lean()
    .then((tag): LeanDocument<inf.Tag> | null => tag);

export const findTags = (ids: Types.ObjectId[]): Promise<LeanDocument<inf.Tag[]>> =>
  TagModel.find({ _id: ids as any })
    .lean()
    .then((tags): LeanDocument<inf.Tag[]> => tags);

export const getTag = (id: Types.ObjectId | string): Promise<LeanDocument<inf.Tag> | null> =>
  TagModel.findById(id)
    .lean()
    .then((tag): LeanDocument<inf.Tag> | null => tag);

export const getTags = (query: typ.PaginationQuery): Promise<LeanDocument<inf.Tag[]>> =>
  TagModel.find()
    .skip(query.startIndex)
    .limit(query.limit)
    .lean()
    .then((tags): LeanDocument<inf.Tag[]> => tags);

export const updateTag = (
  id: Types.ObjectId | string,
  updateQuery: Record<string, unknown>,
): Promise<LeanDocument<inf.Tag> | null> =>
  TagModel.findByIdAndUpdate(id, updateQuery, { new: true, runValidators: true })
    .lean()
    .then((tag): LeanDocument<inf.Tag> | null => tag);

export const updateTagPhotos = (
  tagIds: Types.ObjectId[],
  photoId: Types.ObjectId,
): Promise<typ.QueryStatus> =>
  deleteTagPhotos(photoId).then((): Promise<typ.QueryStatus> => addTagPhotos(tagIds, photoId));
