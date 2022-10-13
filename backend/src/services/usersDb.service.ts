import { LeanDocument } from 'mongoose';

import UserModel from '@/models/User.model';
import * as inf from '@/ts/interfaces/db.interface';

const addUser = (newUser: inf.IUser): Promise<inf.IUser> => UserModel.create(newUser);

const getUser = (id: string): Promise<LeanDocument<inf.IUser> | null> =>
  UserModel.findById(id)
    .lean()
    .then((user): LeanDocument<inf.IUser> | null => user);

const getUsers = (): Promise<LeanDocument<inf.IUser[]>> =>
  UserModel.find()
    .lean()
    .select('-password')
    .then((users): LeanDocument<inf.IUser[]> => users);

const findUser = (email: string): Promise<LeanDocument<inf.IUser> | null> =>
  UserModel.findOne({ email })
    .lean()
    .then((user): LeanDocument<inf.IUser> | null => user);

const usersDbService = {
  addUser,
  findUser,
  getUser,
  getUsers,
};

export default usersDbService;
