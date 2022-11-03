import { Types } from 'mongoose';

import userAdminRequestFixture from '../users/userAdminRequest.fixture';
import utilFixture from '../util.fixture';

import photoFixture from './photoRequest.fixture';

export default {
  __v: 0,
  _id: new Types.ObjectId(userAdminRequestFixture._id),
  createdAt: utilFixture.freezeDate,
  email: userAdminRequestFixture.email.toLowerCase(),
  name: userAdminRequestFixture.name,
  photos: [new Types.ObjectId(userAdminRequestFixture.photos[0]), new Types.ObjectId(photoFixture._id)],
  role: userAdminRequestFixture.role,
  updatedAt: utilFixture.freezeDate,
};
