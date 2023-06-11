import { Types } from 'mongoose';

import * as utilFixture from '../util.fixture';

import tagsRequestFixture from './tagsRequest.fixture';

const [firstTag, secondTag, thirdTag] = tagsRequestFixture;

export default [
  {
    ...firstTag,
    _id: Types.ObjectId(firstTag._id),
    createdAt: utilFixture.freezeDate,
    photos: [Types.ObjectId(firstTag.photos[0])],
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...secondTag,
    _id: Types.ObjectId(secondTag._id),
    createdAt: utilFixture.freezeDate,
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...thirdTag,
    _id: Types.ObjectId(thirdTag._id),
    createdAt: utilFixture.freezeDate,
    updatedAt: utilFixture.freezeDate,
  },
];
