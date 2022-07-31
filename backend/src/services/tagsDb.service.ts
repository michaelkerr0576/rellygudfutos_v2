import { LeanDocument } from 'mongoose';

import TagModel, { ITag } from '@/models/Tag.model';

const addTag = (newTag: ITag): Promise<ITag> => TagModel.create(newTag);

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

const tagsDbService = { addTag, deleteTag, findTag, getTag, getTags, updateTag };

export default tagsDbService;
