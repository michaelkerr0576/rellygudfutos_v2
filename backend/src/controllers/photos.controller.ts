import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import PhotoModel, { IPhoto } from '@/models/Photo.model';
import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import { generalUtils } from '@/utils';

import { controllerUtils, photoControllerUtils } from './utils';

// * @desc Add photo
// * @route POST /api/photos
// * @access Private
const addPhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { body } = request;
  const tagIds = body?.details?.imageTags;

  const newPhoto = new PhotoModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  return tagsDbService
    .checkTagsExist(tagIds)
    .then((isTagsFound): void => photoControllerUtils.handleIsTagsFound(response, isTagsFound))
    .then((): Promise<IPhoto> => photosDbService.addPhoto(newPhoto))
    .then((photo): void => photoControllerUtils.handleAddedPhoto(response, photo))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): void => next(error));
};

// * @desc Delete photo
// * @route DELETE /api/photos/:id
// * @access Private
const deletePhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return photosDbService
    .deletePhoto(id)
    .then((photo): void => photoControllerUtils.handleDeletedPhoto(response, photo))
    .catch((error): void => next(error));
};

// * @desc Get photo
// * @route GET /api/photos/:id
// * @access Public
const getPhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return photosDbService
    .getPhoto(id)
    .then((photo): void => photoControllerUtils.handlePhoto(response, photo))
    .catch((error): void => next(error));
};

// * @desc Get photos
// * @route GET /api/photos
// * @access Public
const getPhotos = (_request: Request, response: Response, next: NextFunction): Promise<void> =>
  photosDbService
    .getPhotos()
    .then((photos): void => photoControllerUtils.handlePhotos(response, photos))
    .catch((error): void => next(error));

// * @desc Update photo
// * @route PUT /api/photos/:id
// * @access Private
const updatePhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    body,
    params: { id },
  } = request;

  const isBodyEmpty = generalUtils.isObjectEmpty(body);
  if (isBodyEmpty) {
    return Promise.resolve(next(controllerUtils.handleEmptyBodyRequest(response)));
  }

  return photosDbService
    .updatePhoto(id, body)
    .then((photo): void => photoControllerUtils.handleUpdatedPhoto(response, photo))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): void => next(error));
};

const photosController = {
  addPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
};

export default photosController;
