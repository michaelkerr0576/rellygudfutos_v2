import { Response } from 'express';
import { LeanDocument } from 'mongoose';

import * as inf from '@/ts/interfaces/db.interface';
import errorMessageUtils from '@/utils/errorMessage.utils';
import responseMessageUtils from '@/utils/responseMessage.utils';

const handleAddedTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(201).json({
    data: tag,
    message: responseMessageUtils.dataAdded('Tag'),
  });
};

const handleDeletedTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: responseMessageUtils.dataDeleted('Tag'),
  });
};

const handleTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: responseMessageUtils.dataFetched('Tag'),
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
    message: responseMessageUtils.dataFetched('Tags'),
  });
};

const handleUpdatedTag = (response: Response, tag: LeanDocument<inf.ITag> | null): void => {
  if (!tag) {
    response.status(404);
    throw new Error(errorMessageUtils.error404('Tag'));
  }

  response.status(200).json({
    data: tag,
    message: responseMessageUtils.dataUpdated('Tag'),
  });
};

export default {
  handleAddedTag,
  handleDeletedTag,
  handleTag,
  handleTags,
  handleUpdatedTag,
};
