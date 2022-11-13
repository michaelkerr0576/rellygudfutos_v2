import { Types } from 'mongoose';

import userAdminResponseFixture from '../users/userAdminResponse.fixture';

import photoFixture from './photoRequest.fixture';

export default {
  ...userAdminResponseFixture,
  photos: [new Types.ObjectId(userAdminResponseFixture.photos[0]), new Types.ObjectId(photoFixture._id)],
};
