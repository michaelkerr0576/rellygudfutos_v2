import { Types } from 'mongoose';

import utilFixture from '../util.fixture';

import postTagFixture from './tagRequest.fixture';

export default {
  ...postTagFixture,
  __v: 0,
  _id: new Types.ObjectId(postTagFixture._id),
  createdAt: utilFixture.freezeDate,
  updatedAt: utilFixture.freezeDate,
};
