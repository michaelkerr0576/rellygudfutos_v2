import express from 'express';

import photosController from '@/controllers/photos.controller';
import protectRoute from '@/middlewares/protectRoute.middleware';

const router = express.Router();

router
  .route('/')
  .get(photosController.getPhotos)
  .post(protectRoute.userAuthorisation, photosController.addPhoto);

router
  .route('/:id')
  .get(photosController.getPhoto)
  .put(protectRoute.userAuthorisation, photosController.updatePhoto)
  .delete(protectRoute.userAuthorisation, photosController.deletePhoto);

export default router;
