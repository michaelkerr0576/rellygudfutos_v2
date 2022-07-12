import { Request, Response } from 'express';
import { Types } from 'mongoose';

import PhotoModel, { IPhoto } from '@/models/Photo.model';
import photosDbService from '@/services/photosDb.service';
import * as cmn from '@/types/cmn.types';
import { throwErrorUtils } from '@/utils';

// @desc Add photo
// @route POST /photos
// @access Private
const addPhoto = (request: Request, response: Response): Promise<void> => {
  const { body } = request;

  const newPhoto = new PhotoModel({
    _id: new Types.ObjectId(),
    ...body,
  });

  const handleResult = (result: IPhoto): void => {
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

  return photosDbService
    .addPhoto(newPhoto)
    .then((result): void => handleResult(result))
    .catch((error): void => handleError(error));
};

// @desc Delete photo
// @route DELETE /photos/:id
// @access Private
const deletePhoto = (request: Request, response: Response): Promise<void> => {
  const { id } = request.params;

  const handleResult = (result: IPhoto | null): void => {
    if (!result) {
      throwErrorUtils.throw404Error(response, 'Photo');
      return;
    }

    response.status(200).json(result);
  };

  return photosDbService
    .deletePhoto(id)
    .then((result): void => handleResult(result))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// @desc Get photo
// @route GET /photos/:id
// @access Public
const getPhoto = (request: Request, response: Response): Promise<void> => {
  const { id } = request.params;

  const handleResult = (result: IPhoto | null): void => {
    if (!result) {
      throwErrorUtils.throw404Error(response, 'Photo');
      return;
    }

    response.status(200).json(result);
  };

  return photosDbService
    .getPhoto(id)
    .then((result): void => handleResult(result))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// @desc Get photos
// @route GET /photos
// @access Public
const getPhotos = (_request: Request, response: Response): Promise<void> => {
  const handleResult = (result: IPhoto[]): void => {
    if (!result) {
      throwErrorUtils.throw400Error(response);
      return;
    }

    if (result.length === 0) {
      throwErrorUtils.throwEmptyResultError(response, 'Photos');
      return;
    }

    response.status(200).json(result);
  };

  return photosDbService
    .getPhotos()
    .then((result): void => handleResult(result))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

// @desc Update photo
// @route PUT /photos/:id
// @access Private
const updatePhoto = (request: Request, response: Response): Promise<void> => {
  const {
    body,
    params: { id },
  } = request;

  const handleResult = (result: IPhoto | null): void => {
    if (!result) {
      throwErrorUtils.throw404Error(response, 'Photo');
      return;
    }

    response.status(200).json(result);
  };

  return photosDbService
    .updatePhoto(id, body)
    .then((result): void => handleResult(result))
    .catch((error): void => throwErrorUtils.throw500Error(response, error));
};

const photosController = {
  addPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
};

export default photosController;
