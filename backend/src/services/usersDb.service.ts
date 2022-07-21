import UserModel, { IUser } from '@/models/User.model';

const addUser = (newUser: IUser): Promise<IUser> => UserModel.create(newUser);

const getUser = (id: string): Promise<IUser | null> =>
  UserModel.findById(id)
    .select('-__v')
    .then((user): IUser | null => user);

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
  getUser,
  getUsers,
};

export default usersDbService;
