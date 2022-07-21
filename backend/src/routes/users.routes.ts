import express from 'express';

import usersController from '@/controllers/users.controller';
import protectRoute from '@/middlewares/protectRoute.middleware';

const router = express.Router();

router
  .route('/')
  .get(protectRoute.userAuthorisation, usersController.getUsers)
  .post(protectRoute.adminAuthorisation, usersController.addUser);

router
  .route('/:id')
  .get(protectRoute.userAuthorisation, usersController.getUser)
  .put(protectRoute.adminAuthorisation, usersController.updateUser)
  .delete(protectRoute.adminAuthorisation, usersController.deleteUser);

router.route('/login').post(usersController.loginUser);

export default router;
