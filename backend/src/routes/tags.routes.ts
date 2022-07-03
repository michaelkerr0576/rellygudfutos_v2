import express from 'express';

import tagsController from '@/controllers/tags.controller';

const router = express.Router();

router.route('/').get(tagsController.getTags).post(tagsController.addTag);

router
  .route('/:id')
  .get(tagsController.getTag)
  .put(tagsController.updateTag)
  .delete(tagsController.deleteTag);

export default router;
