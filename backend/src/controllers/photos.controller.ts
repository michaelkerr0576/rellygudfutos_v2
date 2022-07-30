import { Request, Response } from 'express';
import { LeanDocument, Types } from 'mongoose';

import PhotoModel, { IPhoto } from '@/models/Photo.model';
import photosDbService from '@/services/photosDb.service';
import * as cmn from '@/types/cmn.types';
import { generalUtils, throwErrorUtils } from '@/utils';

// * @desc Add photo
// * @route POST /api/photos
// * @access Private
const addPhoto = (request: Request, response: Response): Promise<void> => {
  const { body } = request;

  const newPhoto = new PhotoModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  const handlePhoto = (photo: IPhoto): void => {
    if (!photo) {
      throwErrorUtils.throw400Error(response);
      return;
    }

    response.status(201).json({
      message: 'Photo added',
      addedPhoto: photo,
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

  return photosDbService
    .addPhoto(newPhoto)
    .then((photo): void => handlePhoto(photo))
    .catch((error): void => handleError(error));
};

// * @desc Delete photo
// * @route DELETE /api/photos/:id
// * @access Private
const deletePhoto = (request: Request, response: Response): Promise<void> => {
  const { id } = request.params;

  const handlePhoto = (photo: LeanDocument<IPhoto> | null): void => {
    if (!photo) {
      throwErrorUtils.throw404Error(response, 'Photo');
      return;
    }

    response.status(200).json({
      message: 'Photo deleted',
      deletedPhoto: photo,
    });
  };

  return photosDbService
    .deletePhoto(id)
    .then((photo): void => handlePhoto(photo))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// * @desc Get photo
// * @route GET /api/photos/:id
// * @access Public
const getPhoto = (request: Request, response: Response): Promise<void> => {
  const { id } = request.params;

  const handlePhoto = (photo: LeanDocument<IPhoto> | null): void => {
    if (!photo) {
      throwErrorUtils.throw404Error(response, 'Photo');
      return;
    }

    response.status(200).json(photo);
  };

  return photosDbService
    .getPhoto(id)
    .then((photo): void => handlePhoto(photo))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// * @desc Get photos
// * @route GET /api/photos
// * @access Public
const getPhotos = (_request: Request, response: Response): Promise<void> => {
  const handlePhotos = (photos: LeanDocument<IPhoto[]>): void => {
    if (!photos) {
      throwErrorUtils.throw400Error(response);
      return;
    }

    const isPhotosEmpty = photos.length === 0;
    if (isPhotosEmpty) {
      throwErrorUtils.throwEmptyResultError(response, 'Photos');
      return;
    }

    response.status(200).json(photos);
  };

  return photosDbService
    .getPhotos()
    .then((photos): void => handlePhotos(photos))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// * @desc Update photo
// * @route PUT /api/photos/:id
// * @access Private
const updatePhoto = (request: Request, response: Response): Promise<void> => {
  const {
    body,
    params: { id },
  } = request;

  const isBodyEmpty = generalUtils.isObjectEmpty(body);
  if (isBodyEmpty) {
    throwErrorUtils.throwEmptyRequestBodyError(response, 'Photo');
    Promise.resolve();
  }

  const handlePhoto = (photo: LeanDocument<IPhoto> | null): void => {
    if (!photo) {
      throwErrorUtils.throw404Error(response, 'Photo');
      return;
    }

    response.status(200).json({
      message: 'Photo updated',
      updatedPhoto: photo,
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

  return photosDbService
    .updatePhoto(id, body)
    .then((photo): void => handlePhoto(photo))
    .catch((error): void => handleError(error));
};

const photosController = {
  addPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
};

export default photosController;
