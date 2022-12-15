import express from 'express';

import * as tagsController from '@/controllers/tags.controller';
import * as protectRouteMiddleware from '@/middlewares/protectRoute.middleware';

const router = express.Router();

router
  .route('/')
  .get(tagsController.getTags)
  .post(protectRouteMiddleware.userAuthorisation, tagsController.addTag);

router
  .route('/:id')
  .get(tagsController.getTag)
  .put(protectRouteMiddleware.userAuthorisation, tagsController.updateTag)
  .delete(protectRouteMiddleware.userAuthorisation, tagsController.deleteTag);

export default router;
