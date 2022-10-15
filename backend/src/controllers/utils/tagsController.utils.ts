import { Response } from 'express';
import { LeanDocument } from 'mongoose';

import * as inf from '@/ts/interfaces/db.interface';
import errorMessageUtils from '@/utils/errorMessage.utils';

const handleAddedTag = (response: Response, tag: inf.ITag): void => {
  response.status(201).json({
    addedTag: tag,
    message: 'Tag added',
  });
};

const handleDeletedTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: 'Tag deleted',
  });
};

const handleTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: 'Tag fetched successfully',
  });
};

const handleTags = (response: Response, tags: LeanDocument<inf.ITag[]>): void => {
  const isTagsEmpty = tags.length === 0;
  if (isTagsEmpty) {
    response.status(404);
    throw new Error(errorMessageUtils.error404EmptyResult('Tags'));
  }

  response.status(200).json({
    data: tags,
    message: 'Tags fetched successfully',
  });
};

const handleUpdatedTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: 'Tag updated',
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
