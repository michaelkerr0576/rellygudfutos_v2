import express from 'express';
import multer from 'multer';

import photosController from '@/controllers/photos.controller';
import protectRouteMiddleware from '@/middlewares/protectRoute.middleware';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .route('/')
  .get(photosController.getPhotos)
  .post(protectRouteMiddleware.userAuthorisation, upload.single('image'), photosController.addPhoto);

router
  .route('/:id')
  .get(photosController.getPhoto)
  .put(protectRouteMiddleware.userAuthorisation, photosController.updatePhoto)
  .delete(protectRouteMiddleware.userAuthorisation, photosController.deletePhoto);

export default router;
