import { Response } from 'express';
import { LeanDocument } from 'mongoose';

import { ITag } from '@/models/Tag.model';
import { errorMessageUtils } from '@/utils';

const handleAddedTag = (response: Response, tag: ITag): void => {
  response.status(201).json({
    message: 'Tag added',
    addedTag: tag,
  });
};

const handleDeletedTag = (response: Response, tag: LeanDocument<ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    message: 'Tag deleted',
    deletedTag: tag,
  });
};

const handleTag = (response: Response, tag: LeanDocument<ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json(tag);
};

const handleTags = (response: Response, tags: LeanDocument<ITag[]>): void => {
  const isTagsEmpty = tags.length === 0;
  if (isTagsEmpty) {
    response.status(404);
    throw new Error(errorMessageUtils.error404EmptyResult('Tags'));
  }

  response.status(200).json(tags);
};

const handleUpdatedTag = (response: Response, tag: LeanDocument<ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    message: 'Tag updated',
    updatedTag: tag,
  });
};

const tagsControllerUtils = {
  handleAddedTag,
  handleDeletedTag,
  handleTag,
  handleTags,
  handleUpdatedTag,
};

export default tagsControllerUtils;
