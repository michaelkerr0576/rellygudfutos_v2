import TagModel, { ITag } from '@/models/Tag.model';

const addTag = (newTag: ITag): Promise<ITag> => TagModel.create(newTag);

const deleteTag = (id: string): Promise<ITag | null> =>
  TagModel.findByIdAndDelete(id)
    .select('-__v')
    .then((tag): ITag | null => tag);

const getTag = (id: string): Promise<ITag | null> =>
  TagModel.findById(id)
    .select('-__v')
    .then((tag): ITag | null => tag);

const getTags = (): Promise<ITag[]> =>
  TagModel.find()
    .select('-__v')
    .then((tags): ITag[] => tags);

const updateTag = (id: string, updatedTag: ITag): Promise<ITag | null> =>
  TagModel.findByIdAndUpdate(id, updatedTag, { new: true })
    .select('-__v')
    .then((tag): ITag | null => tag);

const tagsDbService = { addTag, deleteTag, getTag, getTags, updateTag };

export default tagsDbService;
