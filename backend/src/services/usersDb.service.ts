import UserModel, { IUser } from '@/models/User.model';

const addUser = (newUser: IUser): Promise<IUser> => UserModel.create(newUser);

const usersDbService = {
  addUser,
};

export default usersDbService;
