import { Types } from 'mongoose';

import userAdminResponseFixture from '../users/userAdminResponse.fixture';

import photoFixture from './photoRequest.fixture';

export default {
  ...userAdminResponseFixture,
  photos: [Types.ObjectId(userAdminResponseFixture.photos[0] as any), Types.ObjectId(photoFixture._id)],
};
