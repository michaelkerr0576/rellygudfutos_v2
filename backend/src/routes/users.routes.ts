import express from 'express';

import usersController from '@/controllers/users.controller';

const router = express.Router();

router.route('/').get(usersController.getUsers).post(usersController.addUser);

router
  .route('/:id')
  .get(usersController.getUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

router.route('/login').post(usersController.loginUser);

export default router;
