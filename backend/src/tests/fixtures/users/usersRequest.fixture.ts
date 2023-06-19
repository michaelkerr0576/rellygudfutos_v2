import * as enm from '@/types/enums/db.enum';

import userAdminRequestFixture from './userAdminRequest.fixture';
import userRequestFixture from './userRequest.fixture';

export const userThreeRequest = {
  _id: '41224d776a326fb40f000114',
  email: 'testEmail3@test.com',
  equipment: {
    cameras: ['camera1'],
    lenses: ['lens1', 'lens2'],
  },
  name: 'Prof. Brad Pitt',
  password: '12345678Uu%',
  photos: ['00224d776a326fb40f000002'],
  role: enm.UserRole.USER,
};

export default [userRequestFixture, userAdminRequestFixture, userThreeRequest];
