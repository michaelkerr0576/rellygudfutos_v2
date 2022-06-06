import express from 'express';

import photosController from '@controllers/photos.controller';

const router = express.Router();

router
  .route('/')
  .get(photosController.getPhotos)
  .post(photosController.addPhoto);

router
  .route('/:id')
  .get(photosController.getPhoto)
  .put(photosController.updatePhoto)
  .delete(photosController.deletePhoto);

export default router;
