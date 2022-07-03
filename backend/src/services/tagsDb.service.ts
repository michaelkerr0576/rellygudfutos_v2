import TagModel, { ITag } from '@/models/Tag.model';

const addTag = (newTag: ITag): Promise<ITag> => TagModel.create(newTag);

const getTags = (): Promise<ITag[]> =>
  TagModel.find()
    .select('-__v')
    .then((result): ITag[] => result);

const tagsDbService = { addTag, getTags };

export default tagsDbService;
