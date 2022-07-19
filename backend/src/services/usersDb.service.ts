import UserModel, { IUser } from '@/models/User.model';

const addUser = (newUser: IUser): Promise<IUser> => UserModel.create(newUser);

const getUsers = (): Promise<IUser[]> =>
  UserModel.find()
    .select('-__v -password')
    .then((users): IUser[] => users);

const findUser = (email: string): Promise<IUser | null> =>
  UserModel.findOne({ email })
    .select('-__v')
    .then((user): IUser | null => user);

const usersDbService = {
  addUser,
  findUser,
  getUsers,
};

export default usersDbService;
