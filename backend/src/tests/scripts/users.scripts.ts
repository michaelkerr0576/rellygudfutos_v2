import usersDbService from '@/services/usersDb.service';

import userAdminRequestFixture from '../fixtures/users/userAdminRequest.fixture';
import userRequestFixture from '../fixtures/users/userRequest.fixture';
import usersRequestFixture from '../fixtures/users/usersRequest.fixture';

const prepAdminUserData = async (): Promise<void> => {
  await usersDbService.addUser(userAdminRequestFixture as any).catch((error): void => console.log(error));
};

const prepUserData = async (): Promise<void> => {
  await usersDbService.addUser(userRequestFixture as any).catch((error): void => console.log(error));
};

const prepUsersData = async (): Promise<void> => {
  await usersDbService.addUsers(usersRequestFixture as any).catch((error): void => console.log(error));
};

export default {
  prepAdminUserData,
  prepUserData,
  prepUsersData,
};
