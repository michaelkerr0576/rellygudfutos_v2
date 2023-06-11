import { Types } from 'mongoose';

import * as utilFixture from '../util.fixture';

import tagRequestFixture from './tagRequest.fixture';

export default {
  ...tagRequestFixture,
  __v: 0,
  _id: Types.ObjectId(tagRequestFixture._id),
  createdAt: utilFixture.freezeDate,
  updatedAt: utilFixture.freezeDate,
};
