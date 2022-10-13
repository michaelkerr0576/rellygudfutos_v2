import express from 'express';

import photosController from '@/controllers/photos.controller';
import protectRouteMiddleware from '@/middlewares/protectRoute.middleware';

const router = express.Router();

router
  .route('/')
  .get(photosController.getPhotos)
  .post(protectRouteMiddleware.userAuthorisation, photosController.addPhoto);

router
  .route('/:id')
  .get(photosController.getPhoto)
  .put(protectRouteMiddleware.userAuthorisation, photosController.updatePhoto)
  .delete(protectRouteMiddleware.userAuthorisation, photosController.deletePhoto);

export default router;
