import express from 'express';

import * as usersController from '@/controllers/users.controller';
import * as protectRouteMiddleware from '@/middlewares/protectRoute.middleware';

const router = express.Router();

router
  .route('/')
  .get(protectRouteMiddleware.userAuthorisation, usersController.getUsers)
  .post(protectRouteMiddleware.adminAuthorisation, usersController.addUser);

router
  .route('/:id')
  .get(protectRouteMiddleware.userAuthorisation, usersController.getUser)
  .put(protectRouteMiddleware.adminAuthorisation, usersController.updateUser)
  .delete(protectRouteMiddleware.adminAuthorisation, usersController.deleteUser);

router.route('/login').post(usersController.loginUser);

export default router;
