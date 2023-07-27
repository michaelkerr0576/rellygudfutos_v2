import { NextFunction, Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import * as con from '@/constants/regex.constants';
import PhotoModel from '@/models/Photo.model';
import * as photosDbService from '@/services/photosDb.service';
import * as enm from '@/types/enums/db.enum';
import * as inf from '@/types/interfaces/db.interface';
import * as generalUtils from '@/utils/general.utils';

import * as controllerUtils from './utils/controller.utils';
import * as photosControllerUtils from './utils/photosController.utils';

/* 
 $ photosController
  - addPhoto
  - deletePhoto
  - getPhoto
  - getPhotos
  - updatePhoto
*/

/**
 * @desc Add photo
 * @route POST /api/photos
 * @access Private
 */
export const addPhoto = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { body, file } = request;

  if (!file) {
    return Promise.resolve(next(controllerUtils.handleRequiredError(response, 'Photo')));
  }

  const isAuthorisedFileType = con.IMAGE_FILE_REGEX.test(file.originalname);
  if (!isAuthorisedFileType) {
    return Promise.resolve(
      next(controllerUtils.handleFileTypeError(response, '.gif, jpeg, .jpg, .tiff, .png, .webp, .bmp')),
    );
  }

  const uploadedPhoto = await photosControllerUtils.uploadPhotoToS3(file).catch((error): void => next(error));

  if (!uploadedPhoto) {
    return Promise.resolve();
  }

  const newPhoto = new PhotoModel({
    _id: new Types.ObjectId(),
    ...body,
    image: uploadedPhoto,
    photographer: response.locals.user._id,
  });

  const photoId = newPhoto._id;
  const photoTagIds = newPhoto?.tags as Types.ObjectId[];
  const imageKey = newPhoto.image.key;

  return photosControllerUtils
    .checkPhotoTagsExist(response, photoTagIds)
    .then((): Promise<LeanDocument<inf.Photo> | null> => photosDbService.addPhoto(newPhoto))
    .then((photo): Promise<void> => photosControllerUtils.handleAddedPhoto(response, photo))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch(
      (error): Promise<void> => photosControllerUtils.cancelAddPhoto(error, photoId, photoTagIds, imageKey),
    )
    .catch((error): void => next(error));
};

/**
 * @desc Delete photo
 * @route DELETE /api/photos/:id
 * @access Private
 */
export const deletePhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return photosDbService
    .deletePhoto(id)
    .then((photo): Promise<void> => photosControllerUtils.handleDeletedPhoto(response, photo))
    .catch((error): void => next(error));
};

/**
 * @desc Get photo
 * @route GET /api/photos/:id
 * @access Public
 */
export const getPhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return photosDbService
    .getPhoto(id)
    .then((photo): Promise<void> => photosControllerUtils.handlePhoto(response, photo))
    .catch((error): void => next(error));
};

/**
 * @desc Get photos
 * @route GET /api/photos
 * @access Public
 */
export const getPhotos = (request: Request, response: Response, next: NextFunction): Promise<void> => {
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

/**
 * @desc Update photo
 * @route PUT /api/photos/:id
 * @access PrivatePrivate
 */
export const updatePhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    body,
    params: { id },
  } = request;

  const isBodyEmpty = generalUtils.checkIsObjectEmpty(body);
  if (isBodyEmpty) {
    return Promise.resolve(next(controllerUtils.handleEmptyBodyRequest(response, 'Photo')));
  }

  const updateQuery = generalUtils.flattenObject(body);

  return photosDbService
    .updatePhoto(id, updateQuery)
    .then((photo): Promise<void> => photosControllerUtils.handleUpdatedPhoto(response, photo))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): void => next(error));
};
