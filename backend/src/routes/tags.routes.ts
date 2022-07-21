import express from 'express';

import tagsController from '@/controllers/tags.controller';
import protectRoute from '@/middlewares/protectRoute.middleware';

const router = express.Router();

router.route('/').get(tagsController.getTags).post(protectRoute.userAuthorisation, tagsController.addTag);

router
  .route('/:id')
  .get(tagsController.getTag)
  .put(protectRoute.userAuthorisation, tagsController.updateTag)
  .delete(protectRoute.userAuthorisation, tagsController.deleteTag);

export default router;
