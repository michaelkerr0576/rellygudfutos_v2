import { Types } from 'mongoose';

import * as utilFixture from '../util.fixture';

import userAdminRequestFixture from './userAdminRequest.fixture';

export default {
  __v: 0,
  _id: new Types.ObjectId(userAdminRequestFixture._id),
  createdAt: utilFixture.freezeDate,
  email: userAdminRequestFixture.email.toLowerCase(),
  equipment: {
    cameras: userAdminRequestFixture.equipment.cameras,
    lenses: userAdminRequestFixture.equipment.lenses,
  },
  name: userAdminRequestFixture.name,
  photos: [new Types.ObjectId(userAdminRequestFixture.photos[0])],
  role: userAdminRequestFixture.role,
  updatedAt: utilFixture.freezeDate,
};
