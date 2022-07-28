import { Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import TagModel, { ITag } from '@/models/Tag.model';
import tagsDbService from '@/services/tagsDb.service';
import * as cmn from '@/types/cmn.types';
import { throwErrorUtils } from '@/utils';

// * @desc Add tag
// * @route POST /api/tags
// * @access Private
const addTag = (request: Request, response: Response): Promise<void> => {
  const { body } = request;

  const newTag = new TagModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  const handleTag = (tag: ITag): void => {
    if (!tag) {
      throwErrorUtils.throw400Error(response);
      return;
    }

    response.status(201).json({
      message: 'Tag added',
      addedTag: tag,
    });
  };

  const handleError = (error: cmn.MongooseValidationError): void => {
    const isValidationError = error.name === 'ValidationError';
    if (isValidationError) {
      throwErrorUtils.throwValidationError(response, error);
      return;
    }

    throwErrorUtils.throw500Error(response, error);
  };

  return tagsDbService
    .addTag(newTag)
    .then((tag): void => handleTag(tag))
    .catch((error): void => handleError(error));
};

// * @desc Delete tag
// * @route DELETE /api/tags/:id
// * @access Private
const deleteTag = (request: Request, response: Response): Promise<void> => {
  const { id } = request.params;

  const handleTag = (tag: LeanDocument<ITag> | null): void => {
    if (!tag) {
      throwErrorUtils.throw404Error(response, 'Tag');
      return;
    }

    response.status(200).json({
      message: 'Tag deleted',
      deletedTag: tag,
    });
  };

  return tagsDbService
    .deleteTag(id)
    .then((tag): void => handleTag(tag))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// * @desc Get tag
// * @route GET /api/tags/:id
// * @access Public
const getTag = (request: Request, response: Response): Promise<void> => {
  const { id } = request.params;

  const handleTag = (tag: LeanDocument<ITag> | null): void => {
    if (!tag) {
      throwErrorUtils.throw404Error(response, 'Tag');
      return;
    }

    response.status(200).json(tag);
  };

  return tagsDbService
    .getTag(id)
    .then((tag): void => handleTag(tag))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// * @desc Get tags
// * @route GET /api/tags
// * @access Public
const getTags = (_request: Request, response: Response): Promise<void> => {
  const handleTags = (tags: LeanDocument<ITag[]>): void => {
    if (!tags) {
      throwErrorUtils.throw400Error(response);
      return;
    }

    const isTagsEmpty = tags.length === 0;
    if (isTagsEmpty) {
      throwErrorUtils.throwEmptyResultError(response, 'Tags');
      return;
    }

    response.status(200).json(tags);
  };

  return tagsDbService
    .getTags()
    .then((tags): void => handleTags(tags))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// * @desc Update tag
// * @route PUT /api/tags/:id
// * @access Private
const updateTag = (request: Request, response: Response): Promise<void> => {
  const {
    body,
    params: { id },
  } = request;

  const handleTag = (tag: LeanDocument<ITag> | null): void => {
    if (!tag) {
      throwErrorUtils.throw404Error(response, 'Tag');
      return;
    }

    response.status(200).json({
      message: 'Tag updated',
      updatedTag: tag,
    });
  };

  return tagsDbService
    .updateTag(id, body)
    .then((tag): void => handleTag(tag))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

const tagsController = {
  addTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
};

export default tagsController;
