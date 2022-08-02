import { NextFunction, Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import TagModel, { ITag } from '@/models/Tag.model';
import tagsDbService from '@/services/tagsDb.service';
import * as cmn from '@/types/cmn.types';
import { errorMessageUtils, generalUtils } from '@/utils';

// * @desc Add tag
// * @route POST /api/tags
// * @access Private
const addTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { body } = request;

  const newTag = new TagModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  const handleTag = (tag: ITag): void => {
    response.status(201).json({
      message: 'Tag added',
      addedTag: tag,
    });
  };

  const handleTagError = (error: cmn.MongooseValidationError): void => {
    const isValidationError = error.name === 'ValidationError';
    if (isValidationError) {
      const { message, errors } = errorMessageUtils.error400Validation(error);

      response.status(400);
      const newError = new Error(message);
      const validationError = Object.assign(newError, { errors });
      throw validationError;
    }

    throw error;
  };

  return tagsDbService
    .addTag(newTag)
    .then((tag): void => handleTag(tag))
    .catch((error): void => handleTagError(error))
    .catch((error): void => next(error));
};

// * @desc Delete tag
// * @route DELETE /api/tags/:id
// * @access Private
const deleteTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  const handleTag = (tag: LeanDocument<ITag> | null): void => {
    if (!tag) {
      response.status(404);
      throw new Error(errorMessageUtils.error404('Tag'));
    }

    response.status(200).json({
      message: 'Tag deleted',
      deletedTag: tag,
    });
  };

  return tagsDbService
    .deleteTag(id)
    .then((tag): void => handleTag(tag))
    .catch((error): void => next(error));
};

// * @desc Get tag
// * @route GET /api/tags/:id
// * @access Public
const getTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  const handleTag = (tag: LeanDocument<ITag> | null): void => {
    if (!tag) {
      response.status(404);
      throw new Error(errorMessageUtils.error404('Tag'));
    }

    response.status(200).json(tag);
  };

  return tagsDbService
    .getTag(id)
    .then((tag): void => handleTag(tag))
    .catch((error): void => next(error));
};

// * @desc Get tags
// * @route GET /api/tags
// * @access Public
const getTags = (_request: Request, response: Response, next: NextFunction): Promise<void> => {
  const handleTags = (tags: LeanDocument<ITag[]>): void => {
    const isTagsEmpty = tags.length === 0;
    if (isTagsEmpty) {
      response.status(404);
      throw new Error(errorMessageUtils.error404EmptyResult('Tags'));
    }

    response.status(200).json(tags);
  };

  return tagsDbService
    .getTags()
    .then((tags): void => handleTags(tags))
    .catch((error): void => next(error));
};

// * @desc Update tag
// * @route PUT /api/tags/:id
// * @access Private
const updateTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    body,
    params: { id },
  } = request;

  const isBodyEmpty = generalUtils.isObjectEmpty(body);
  if (isBodyEmpty) {
    response.status(400);
    const newError = new Error(errorMessageUtils.error400EmptyRequestBody('Tag'));
    return Promise.resolve(next(newError));
  }

  const handleTag = (tag: LeanDocument<ITag> | null): void => {
    if (!tag) {
      response.status(404);
      throw new Error(errorMessageUtils.error404('Tag'));
    }

    response.status(200).json({
      message: 'Tag updated',
      updatedTag: tag,
    });
  };

  const handleTagError = (error: cmn.MongooseValidationError): void => {
    const isValidationError = error.name === 'ValidationError';
    if (isValidationError) {
      const { message, errors } = errorMessageUtils.error400Validation(error);

      response.status(400);
      const newError = new Error(message);
      const validationError = Object.assign(newError, { errors });
      throw validationError;
    }

    throw error;
  };

  return tagsDbService
    .updateTag(id, body)
    .then((tag): void => handleTag(tag))
    .catch((error): void => handleTagError(error))
    .catch((error): void => next(error));
};

const tagsController = {
  addTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
};

export default tagsController;
