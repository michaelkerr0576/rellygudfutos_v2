import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import TagModel from '@/models/Tag.model';
import tagsDbService from '@/services/tagsDb.service';
import generalUtils from '@/utils/general.utils';

import controllerUtils from './utils/controller.utils';
import tagsControllerUtils from './utils/tagsController.utils';

// * @desc Add tag
// * @route POST /api/tags
// * @access Private
const addTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { body } = request;

  const newTag = new TagModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  return tagsDbService
    .addTag(newTag)
    .then((tag): void => tagsControllerUtils.handleAddedTag(response, tag))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): void => next(error));
};

// * @desc Delete tag
// * @route DELETE /api/tags/:id
// * @access Private
const deleteTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return tagsDbService
    .deleteTag(id)
    .then((tag): void => tagsControllerUtils.handleDeletedTag(response, tag))
    .catch((error): void => next(error));
};

// * @desc Get tag
// * @route GET /api/tags/:id
// * @access Public
const getTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return tagsDbService
    .getTag(id)
    .then((tag): void => tagsControllerUtils.handleTag(response, tag))
    .catch((error): void => next(error));
};

// * @desc Get tags
// * @route GET /api/tags
// * @access Public
const getTags = (_request: Request, response: Response, next: NextFunction): Promise<void> =>
  tagsDbService
    .getTags()
    .then((tags): void => tagsControllerUtils.handleTags(response, tags))
    .catch((error): void => next(error));

// * @desc Update tag
// * @route PUT /api/tags/:id
// * @access Private
const updateTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    body,
    params: { id },
  } = request;

  const isBodyEmpty = generalUtils.checkIsObjectEmpty(body);
  if (isBodyEmpty) {
    return Promise.resolve(next(controllerUtils.handleEmptyBodyRequest(response, 'Tag')));
  }

  return tagsDbService
    .updateTag(id, body)
    .then((tag): void => tagsControllerUtils.handleUpdatedTag(response, tag))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): void => next(error));
};

export default {
  addTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
};
