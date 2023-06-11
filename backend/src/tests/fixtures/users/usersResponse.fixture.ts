import { Types } from 'mongoose';

import * as utilFixture from '../util.fixture';

import userAdminResponseFixture from './userAdminResponse.fixture';
import userResponseFixture from './userResponse.fixture';
import { userThreeRequest } from './usersRequest.fixture';

const userThreeResponse = {
  __v: 0,
  _id: Types.ObjectId(userThreeRequest._id),
  createdAt: utilFixture.freezeDate,
  email: userThreeRequest.email.toLowerCase(),
  equipment: {
    cameras: userThreeRequest.equipment.cameras,
    lenses: userThreeRequest.equipment.lenses,
  },
  name: userThreeRequest.name,
  photos: [Types.ObjectId(userThreeRequest.photos[0])],
  role: userThreeRequest.role,
  updatedAt: utilFixture.freezeDate,
};

export default [userResponseFixture, userAdminResponseFixture, userThreeResponse];
