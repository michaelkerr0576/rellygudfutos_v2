import { Request, Response } from 'express';

// @desc Add photo
// @route POST /photos
// @access Private
const addPhoto = (request: Request, response: Response): void => {
  if (!request.body.name) {
    response.status(400);
    throw new Error('Missing field');
  }

  console.log(request.body);
  response.status(200).json({ message: 'Add photo' });
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
const getPhotos = (_request: Request, response: Response): void => {
  response.status(200).json({ message: 'Get photos' });
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
