import { NextFunction, Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import s3Middleware from '@/middlewares/s3.middleware';
import PhotoModel from '@/models/Photo.model';
import photosDbService from '@/services/photosDb.service';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import generalUtils from '@/utils/general.utils';
import regexUtils from '@/utils/regex.utils';

import controllerUtils from './utils/controller.utils';
import photosControllerUtils from './utils/photosController.utils';

const addPhoto = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { body, file } = request;

  if (!file) {
    return Promise.resolve(next(controllerUtils.handleRequiredError(response, 'Photo')));
  }

  const isAuthorisedFileType = regexUtils.imageFile.test(file.originalname);
  if (!isAuthorisedFileType) {
    return Promise.resolve(
      next(controllerUtils.handleFileTypeError(response, '.gif, jpeg, .jpg, .tiff, .png, .webp, .bmp')),
    );
  }

  const imageKey = generalUtils.generateKey();

  await s3Middleware
    .uploadFile(file.buffer, imageKey, file.mimetype)
    .catch((error): Promise<void> => Promise.resolve(next(error)));

  const imageUrl = await s3Middleware
    .getFileUrl(imageKey)
    .catch((error): Promise<void> => Promise.resolve(next(error)));

  const newPhoto = new PhotoModel({
    _id: new Types.ObjectId(),
    ...body,
    details: {
      ...body?.details,
      imageKey,
      imageName: file.originalname,
      imageType: file.mimetype,
      imageUrl,
      photographer: response.locals.user._id,
    },
  });

  const photoId = newPhoto._id;
  const photoTagIds = newPhoto?.details?.imageTags as Types.ObjectId[];

  return photosControllerUtils
    .checkPhotoTagsExist(response, photoTagIds)
    .then((): Promise<LeanDocument<inf.IPhoto> | null> => photosDbService.addPhoto(newPhoto))
    .then((photo): Promise<void> => photosControllerUtils.handleAddedPhoto(response, photo))
    .catch((error): void => controllerUtils.handleValidationError(response, error))
    .catch((error): Promise<void> => photosControllerUtils.cancelAddPhoto(error, photoId, photoTagIds))
    .catch((error): void => next(error));
};

const deletePhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return photosDbService
    .deletePhoto(id)
    .then((photo): Promise<void> => photosControllerUtils.handleDeletedPhoto(response, photo))
    .catch((error): void => next(error));
};

const getPhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  return photosDbService
    .getPhoto(id)
    .then((photo): Promise<void> => photosControllerUtils.handlePhoto(response, photo))
    .catch((error): void => next(error));
};

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

const updatePhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
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

export default {
  /**
   * @desc Add photo
   * @route POST /api/photos
   * @access Private
   */
  addPhoto,
  /**
   * @desc Delete photo
   * @route DELETE /api/photos/:id
   * @access Private
   */
  deletePhoto,
  /**
   * @desc Get photo
   * @route GET /api/photos/:id
   * @access Public
   */
  getPhoto,
  /**
   * @desc Get photos
   * @route GET /api/photos
   * @access Public
   */
  getPhotos,
  /**
   * @desc Update photo
   * @route PUT /api/photos/:id
   * @access PrivatePrivate
   */
  updatePhoto,
};
