import { NextFunction, Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import PhotoModel from '@/models/Photo.model';
import photosDbService from '@/services/photosDb.service';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import generalUtils from '@/utils/general.utils';

import controllerUtils from './utils/controller.utils';
import photosControllerUtils from './utils/photosController.utils';

// * @desc Add photo
// * @route POST /api/photos
// * @access Private
const addPhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { body } = request;

  const newPhoto = new PhotoModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  const photoId = newPhoto._id;
  const photoTagIds = newPhoto?.details?.imageTags;

  return photosControllerUtils
    .checkPhotoTagsExist(response, photoTagIds)
    .then((): Promise<LeanDocument<inf.IPhoto> | null> => photosDbService.addPhoto(newPhoto))
    .then((photo): Promise<void> => photosControllerUtils.handleAddedPhoto(response, photo))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): Promise<void> => photosControllerUtils.cancelAddPhoto(error, photoId, photoTagIds))
    .catch((error): void => next(error));
};

// * @desc Delete photo
// * @route DELETE /api/photos/:id
// * @access Private
const deletePhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return photosDbService
    .deletePhoto(id)
    .then((photo): Promise<void> => photosControllerUtils.handleDeletedPhoto(response, photo))
    .catch((error): void => next(error));
};

// * @desc Get photo
// * @route GET /api/photos/:id
// * @access Public
const getPhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return photosDbService
    .getPhoto(id)
    .then((photo): void => photosControllerUtils.handlePhoto(response, photo))
    .catch((error): void => next(error));
};

// * @desc Get photos
// * @route GET /api/photos
// * @access Public
const getPhotos = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const photosQuery = photosControllerUtils.getPhotosQuery(request.query);

  const isRandomSort = photosQuery.sort === enm.PhotoSortOptions.RANDOM;
  if (isRandomSort) {
    return Promise.resolve(
      photosDbService
        .getRandomPhotos(photosQuery.limit)
        .then((photos): Promise<void> => photosControllerUtils.handlePhotos(response, photos, photosQuery))
        .catch((error): void => next(error)),
    );
  }

  return photosDbService
    .getPhotos(photosQuery)
    .then((photos): Promise<void> => photosControllerUtils.handlePhotos(response, photos, photosQuery))
    .catch((error): void => next(error));
};

// * @desc Update photo
// * @route PUT /api/photos/:id
// * @access Private
const updatePhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    body,
    params: { id },
  } = request;

  const isBodyEmpty = generalUtils.checkIsObjectEmpty(body);
  if (isBodyEmpty) {
    return Promise.resolve(next(controllerUtils.handleEmptyBodyRequest(response, 'Photo')));
  }

  return photosDbService
    .updatePhoto(id, body)
    .then((photo): void => photosControllerUtils.handleUpdatedPhoto(response, photo))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): void => next(error));
};

export default {
  addPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
};
