import { Types } from 'mongoose';

import utilFixture from '../util.fixture';

import userRequestFixture from './userRequest.fixture';

export default {
  __v: 0,
  _id: new Types.ObjectId(userRequestFixture._id),
  createdAt: utilFixture.freezeDate,
  email: userRequestFixture.email.toLowerCase(),
  name: userRequestFixture.name,
  photos: [new Types.ObjectId(userRequestFixture.photos[0])],
  role: userRequestFixture.role,
  updatedAt: utilFixture.freezeDate,
};
