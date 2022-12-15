import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import TagModel from '@/models/Tag.model';
import * as tagsDbService from '@/services/tagsDb.service';
import * as generalUtils from '@/utils/general.utils';

import * as controllerUtils from './utils/controller.utils';
import * as tagsControllerUtils from './utils/tagsController.utils';

/* 
 $ tagsController
  - addTag
  - deleteTag
  - getTag
  - getTags
  - updateTag
*/

/**
 * @desc Add tag
 * @route POST /api/tags
 * @access Private
 */
export const addTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { body } = request;

  const newTag = new TagModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  return tagsDbService
    .addTag(newTag)
    .then((tag): Promise<void> => tagsControllerUtils.handleAddedTag(response, tag))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): void => next(error));
};

/**
 * @desc Delete tag
 * @route DELETE /api/tags/:id
 * @access Private
 */
export const deleteTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return tagsDbService
    .deleteTag(id)
    .then((tag): Promise<void> => tagsControllerUtils.handleDeletedTag(response, tag))
    .catch((error): void => next(error));
};

/**
 * @desc Get tag
 * @route GET /api/tags/:id
 * @access Public
 */
export const getTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return tagsDbService
    .getTag(id)
    .then((tag): Promise<void> => tagsControllerUtils.handleTag(response, tag))
    .catch((error): void => next(error));
};

/**
 * @desc Get tags
 * @route GET /api/tags
 * @access Public
 */
export const getTags = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const tagsQuery = tagsControllerUtils.getTagsQuery(request.query);

  return tagsDbService
    .getTags(tagsQuery)
    .then((photos): Promise<void> => tagsControllerUtils.handleTags(response, photos, tagsQuery))
    .catch((error): void => next(error));
};

/**
 * @desc Update tag
 * @route PUT /api/tags/:id
 * @access Private
 */
export const updateTag = (request: Request, response: Response, next: NextFunction): Promise<void> => {
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
    .then((tag): Promise<void> => tagsControllerUtils.handleUpdatedTag(response, tag))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): void => next(error));
};
