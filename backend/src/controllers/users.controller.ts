import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { Types } from 'mongoose';

// import UserModel, { IUser } from '@/models/User.model';
// import usersDbService from '@/services/usersDb.service';
// import * as cmn from '@/types/cmn.types';
// import { throwErrorUtils } from '@/utils';

// * @desc Add user
// * @route POST /api/users
// * @access Private
const addUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah add' });
};

// * @desc Delete user
// * @route DELETE /api/users/:id
// * @access Private
const deleteUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah delete' });
};

// * @desc Get user
// * @route GET /api/users/:id
// * @access Private
const getUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah get user id' });
};

// * @desc Get users
// * @route GET /api/users
// * @access Private
const getUsers = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah users' });
};

// * @desc Login user
// * @route POST /api/users/login
// * @access Public
const loginUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah post' });
};

// * @desc Update user
// * @route PUT /api/users/:id
// * @access Private
const updateUser = (_request: Request, response: Response): void => {
  response.json({ message: 'Yeah put' });
};

const usersController = {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
};

export default usersController;
