import { LeanDocument } from 'mongoose';

import UserModel, { IUser } from '@/models/User.model';

const addUser = (newUser: IUser): Promise<IUser> => UserModel.create(newUser);

const getUser = (id: string): Promise<LeanDocument<IUser> | null> =>
  UserModel.findById(id)
    .lean()
    .select('-__v')
    .then((user): LeanDocument<IUser> | null => user);

const getUsers = (): Promise<LeanDocument<IUser[]>> =>
  UserModel.find()
    .lean()
    .select('-__v -password')
    .then((users): LeanDocument<IUser[]> => users);

const findUser = (email: string): Promise<LeanDocument<IUser> | null> =>
  UserModel.findOne({ email })
    .lean()
    .select('-__v')
    .then((user): LeanDocument<IUser> | null => user);

const usersDbService = {
  addUser,
  findUser,
  getUser,
  getUsers,
};

export default usersDbService;
