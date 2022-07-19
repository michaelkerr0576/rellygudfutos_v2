import UserModel, { IUser } from '@/models/User.model';

const addUser = (newUser: IUser): Promise<IUser> => UserModel.create(newUser);

const getUsers = (): Promise<IUser[]> =>
  UserModel.find()
    .select('-__v -password')
    .then((result): IUser[] => result);

const usersDbService = {
  addUser,
  getUsers,
};

export default usersDbService;
