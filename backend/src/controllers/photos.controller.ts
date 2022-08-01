import { NextFunction, Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import PhotoModel, { IPhoto } from '@/models/Photo.model';
import photosDbService from '@/services/photosDb.service';
// import tagsDbService from '@/services/tagsDb.service';
import * as cmn from '@/types/cmn.types';
import { errorMessageUtils, generalUtils } from '@/utils';

// * @desc Add photo
// * @route POST /api/photos
// * @access Private
const addPhoto = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { body } = request;

  // Todo : fix no tags handling
  // const tagIds = body?.details?.imageTags;
  // const isTagsExist = tagIds ? await tagsDbService.checkTagsExist(tagIds) : false;

  // if (!isTagsExist) {
  //   response.status(404);
  //   throw new Error(errorMessageUtils.error404ArrayValueNotFound('Tag', 'Image Tags'));
  // }

  const newPhoto = new PhotoModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  const handlePhoto = (photo: IPhoto): void => {
    // Todo : fix push new photo tags
    // const {
    //   _id: photoId,
    //   details: { imageTags: photoTagIds },
    // } = photo;

    // const addTagsResult = await tagsDbService.addTagPhotos(photoId, photoTagIds);

    // const isAddTagsFailed = addTagsResult === enm.RequestStatus.FAILED;
    // if (isAddTagsFailed) {
    //   throwErrorUtils.throw500Error(response);
    //   return Promise.resolve();
    // }

    response.status(201).json({
      message: 'Photo added',
      addedPhoto: photo,
    });
  };

  const handleError = (error: cmn.MongooseValidationError): void => {
    const isValidationError = error.name === 'ValidationError';
    if (isValidationError) {
      const { message, errors } = errorMessageUtils.error400Validation(error);

      response.status(400);
      const newError = new Error(message);
      const validationError = Object.assign(newError, { errors });
      throw validationError;
    }

    next(error);
  };

  return photosDbService
    .addPhoto(newPhoto)
    .then((photo): void => handlePhoto(photo))
    .catch((error): void => handleError(error))
    .catch((error): void => next(error));
};

// * @desc Delete photo
// * @route DELETE /api/photos/:id
// * @access Private
const deletePhoto = (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  const handlePhoto = (photo: LeanDocument<IPhoto> | null): void => {
    if (!photo) {
      response.status(404);
      throw new Error(errorMessageUtils.error404('Photo'));
    }

    response.status(200).json({
      message: 'Photo deleted',
      deletedPhoto: photo,
    });
  };

  return photosDbService
    .deletePhoto(id)
    .then((photo): void => handlePhoto(photo))
    .catch((error): void => next(error));
};

// * @desc Get photo
// * @route GET /api/photos/:id
// * @access Public
const getPhoto = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id } = request.params;

  const handlePhoto = (photo: LeanDocument<IPhoto> | null): void => {
    if (!photo) {
      response.status(404);
      throw new Error(errorMessageUtils.error404('Photo'));
    }

    response.status(200).json(photo);
  };

  return photosDbService
    .getPhoto(id)
    .then((photo): void => handlePhoto(photo))
    .catch((error): void => next(error));
};

// * @desc Get photos
// * @route GET /api/photos
// * @access Public
const getPhotos = (_request: Request, response: Response, next: NextFunction): Promise<void> => {
  const handlePhotos = (photos: LeanDocument<IPhoto[]>): void => {
    const isPhotosEmpty = photos.length === 0;
    if (isPhotosEmpty) {
      response.status(404);
      throw new Error(errorMessageUtils.error404EmptyResult('Photos'));
    }

    response.status(200).json(photos);
  };

  return photosDbService
    .getPhotos()
    .then((photos): void => handlePhotos(photos))
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

  const isBodyEmpty = generalUtils.isObjectEmpty(body);
  if (isBodyEmpty) {
    response.status(400);
    const newError = new Error(errorMessageUtils.error400EmptyRequestBody('Photo'));
    return Promise.resolve(next(newError));
  }

  const handlePhoto = (photo: LeanDocument<IPhoto> | null): void => {
    if (!photo) {
      response.status(404);
      throw new Error(errorMessageUtils.error404('Photo'));
    }

    response.status(200).json({
      message: 'Photo updated',
      updatedPhoto: photo,
    });
  };

  const handleError = (error: cmn.MongooseValidationError): void => {
    const isValidationError = error.name === 'ValidationError';
    if (isValidationError) {
      const { message, errors } = errorMessageUtils.error400Validation(error);

      response.status(400);
      const newError = new Error(message);
      const validationError = Object.assign(newError, { errors });
      throw validationError;
    }

    next(error);
  };

  return photosDbService
    .updatePhoto(id, body)
    .then((photo): void => handlePhoto(photo))
    .catch((error): void => handleError(error))
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
