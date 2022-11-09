import { LeanDocument, Types } from 'mongoose';

import UserModel from '@/models/User.model';
import * as enm from '@/ts/enums/db.enum';
import * as inf from '@/ts/interfaces/db.interface';
import * as typ from '@/ts/types/db.types';

const addUser = (newUser: inf.IUser): Promise<LeanDocument<inf.IUser> | null> =>
  UserModel.create(newUser).then(
    (user): Promise<LeanDocument<inf.IUser> | null> =>
      UserModel.findById(user._id)
        .select('-password')
        .lean()
        .then((addedUser): LeanDocument<inf.IUser> | null => addedUser),
  );

const addUserPhoto = (userId: Types.ObjectId, photoId: Types.ObjectId): Promise<typ.QueryStatus> =>
  UserModel.findByIdAndUpdate(
    { _id: userId },
    {
      $push: { photos: photoId },
    },
  ).then((): typ.QueryStatus => ({ status: enm.QueryStatus.SUCCESS }));

const addUsers = (newUsers: inf.IUser[]): Promise<LeanDocument<inf.IUser[]> | null> =>
  UserModel.insertMany(newUsers).then(
    (users): Promise<LeanDocument<inf.IUser[]> | null> =>
      UserModel.find({ _id: users.map((user): Types.ObjectId => user._id) as any })
        .select('-password')
        .lean()
        .then((addedUsers): LeanDocument<inf.IUser[]> | null => addedUsers),
  );

const checkUserPhotoExists = (photoId: Types.ObjectId): Promise<boolean> =>
  UserModel.exists({ photos: photoId });

const deleteUser = (id: Types.ObjectId | string): Promise<LeanDocument<inf.IUser> | null> =>
  UserModel.findByIdAndDelete(id)
    .select('-password')
    .lean()
    .then((user): LeanDocument<inf.IUser> | null => user);

const deleteUserPhoto = (userId: Types.ObjectId, photoId: Types.ObjectId): Promise<typ.QueryStatus> =>
  UserModel.findByIdAndUpdate(
    { _id: userId },
    {
      $pull: { photos: photoId },
    },
  ).then((): typ.QueryStatus => ({ status: enm.QueryStatus.SUCCESS }));

const findUser = (email: string): Promise<LeanDocument<inf.IUser> | null> =>
  UserModel.findOne({ email })
    .lean()
    .then((user): LeanDocument<inf.IUser> | null => user);

const getUser = (id: Types.ObjectId | string): Promise<LeanDocument<inf.IUser> | null> =>
  UserModel.findById(id)
    .select('-password')
    .lean()
    .then((user): LeanDocument<inf.IUser> | null => user);

const getUsers = (): Promise<LeanDocument<inf.IUser[]>> =>
  UserModel.find()
    .select('-password')
    .lean()
    .then((users): LeanDocument<inf.IUser[]> => users);

const updateUser = (
  id: Types.ObjectId | string,
  updatedUser: inf.IUser,
): Promise<LeanDocument<inf.IUser> | null> =>
  UserModel.findByIdAndUpdate(id, updatedUser, { new: true, runValidators: true })
    .select('-password')
    .lean()
    .then((user): LeanDocument<inf.IUser> | null => user);

export default {
  addUser,
  addUserPhoto,
  addUsers,
  checkUserPhotoExists,
  deleteUser,
  deleteUserPhoto,
  findUser,
  getUser,
  getUsers,
  updateUser,
};
