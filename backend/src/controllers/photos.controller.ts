import { Request, Response } from 'express';

import { IPhoto } from '@/models/Photo.model';
import photosService from '@/services/photos.service';
import * as cmn from '@/types/cmn';
import errorUtils from '@/utils/error.utils';

// @desc Add photo
// @route POST /photos
// @access Private
const addPhoto = (request: Request, response: Response): Promise<void> => {
  const { body } = request;

  const handleResult = (result: IPhoto): void => {
    if (!result) {
      errorUtils.throw400Error(response);
      return;
    }

    response.status(200).json(result);
  };

  const handleError = (error: cmn.MongooseValidationError): void => {
    if (error.name === 'ValidationError') {
      errorUtils.throwValidationError(response, error);
      return;
    }

    errorUtils.throw500Error(response, error);
  };

  return photosService
    .addPhoto(body)
    .then((result): void => handleResult(result))
    .catch((error): void => handleError(error));
};

// @desc Delete photo
// @route DELETE /photos/:id
// @access Private
const deletePhoto = (request: Request, response: Response): void => {
  response.status(200).json({ message: `Delete photo ${request.params.id}` });
};

// @desc Get photo
// @route GET /photos/:id
// @access Public
const getPhoto = (request: Request, response: Response): void => {
  response.status(200).json({ message: `Get photo ${request.params.id}` });
};

// @desc Get photos
// @route GET /photos
// @access Public
const getPhotos = (_request: Request, response: Response): Promise<void> => {
  const handleResult = (result: IPhoto[]): void => {
    if (!result) {
      errorUtils.throw400Error(response);
      return;
    }

    if (result.length === 0) {
      errorUtils.throwEmptyResultError(response, 'Photos');
      return;
    }

    response.status(200).json(result);
  };

  return photosService
    .getPhotos()
    .then((result): void => handleResult(result))
    .catch((error): void => errorUtils.throw500Error(response, error));
};

// @desc Update photo
// @route PUT /photos/:id
// @access Private
const updatePhoto = (request: Request, response: Response): void => {
  response.status(200).json({ message: `Update photo ${request.params.id}` });
};

const photosController = {
  addPhoto,
  deletePhoto,
  getPhoto,
  getPhotos,
  updatePhoto,
};

export default photosController;
