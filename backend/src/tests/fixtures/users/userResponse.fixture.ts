import { Types } from 'mongoose';

import * as utilFixture from '../util.fixture';

import userRequestFixture from './userRequest.fixture';

export default {
  __v: 0,
  _id: Types.ObjectId(userRequestFixture._id),
  createdAt: utilFixture.freezeDate,
  email: userRequestFixture.email.toLowerCase(),
  equipment: {
    cameras: userRequestFixture.equipment.cameras,
    lenses: userRequestFixture.equipment.lenses,
  },
  name: userRequestFixture.name,
  photos: [Types.ObjectId(userRequestFixture.photos[0])],
  role: userRequestFixture.role,
  updatedAt: utilFixture.freezeDate,
};
