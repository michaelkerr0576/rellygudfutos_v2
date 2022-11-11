import * as enm from '@/ts/enums/db.enum';

import userAdminRequestFixture from './userAdminRequest.fixture';
import userRequestFixture from './userRequest.fixture';

export const userThreeRequest = {
  _id: '41224d776a326fb40f000114',
  email: 'testEmail3@test.com',
  name: 'Prof. Brad Pitt',
  password: '12345678Uu%',
  photos: ['00224d776a326fb40f000002'],
  role: enm.UserRole.USER,
};

export default [userRequestFixture, userAdminRequestFixture, userThreeRequest];
