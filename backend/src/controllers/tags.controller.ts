import { Request, Response } from 'express';
import { Types } from 'mongoose';

import TagModel, { ITag } from '@/models/Tag.model';
import tagsDbService from '@/services/tagsDb.service';
import * as cmn from '@/types/cmn.types';
import { throwErrorUtils } from '@/utils';

// @desc Add tag
// @route POST /tags
// @access Private
const addTag = (request: Request, response: Response): Promise<void> => {
  const { body } = request;

  const newTag = new TagModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  const handleResult = (result: ITag): void => {
    if (!result) {
      throwErrorUtils.throw400Error(response);
      return;
    }

    response.status(200).json(result);
  };

  const handleError = (error: cmn.MongooseValidationError): void => {
    if (error.name === 'ValidationError') {
      throwErrorUtils.throwValidationError(response, error);
      return;
    }

    throwErrorUtils.throw500Error(response, error);
  };

  return tagsDbService
    .addTag(newTag)
    .then((result): void => handleResult(result))
    .catch((error): void => handleError(error));
};

// @desc Delete tag
// @route DELETE /s/:id
// @access Private
const deleteTag = (request: Request, response: Response): void => {
  response.status(200).json({ message: `Delete tag ${request.params.id}` });
};

// @desc Get tag
// @route GET /tags/:id
// @access Public
const getTag = (request: Request, response: Response): void => {
  response.status(200).json({ message: `Get tag ${request.params.id}` });
};

// @desc Get tags
// @route GET /tags
// @access Public
const getTags = (_request: Request, response: Response): Promise<void> => {
  const handleResult = (result: ITag[]): void => {
    if (!result) {
      throwErrorUtils.throw400Error(response);
      return;
    }

    if (result.length === 0) {
      throwErrorUtils.throwEmptyResultError(response, 'Tags');
      return;
    }

    response.status(200).json(result);
  };

  return tagsDbService
    .getTags()
    .then((result): void => handleResult(result))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// @desc Update tag
// @route PUT /tags/:id
// @access Private
const updateTag = (request: Request, response: Response): void => {
  response.status(200).json({ message: `Update tag ${request.params.id}` });
};

const tagsController = {
  addTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
};

export default tagsController;
