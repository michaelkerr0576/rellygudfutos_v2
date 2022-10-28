import usersDbService from '@/services/usersDb.service';

import userAdminFixture from '../fixtures/users/userAdminRequest.fixture';
import userFixture from '../fixtures/users/userRequest.fixture';

const prepAdminUserData = async (): Promise<void> => {
  await usersDbService.addUser(userAdminFixture as any).catch((error): void => console.log(error));
};

const prepUserData = async (): Promise<void> => {
  await usersDbService.addUser(userFixture as any).catch((error): void => console.log(error));
};

export default {
  prepAdminUserData,
  prepUserData,
};
