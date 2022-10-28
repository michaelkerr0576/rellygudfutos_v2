import { Types } from 'mongoose';

import utilFixture from '../util.fixture';

import tagsRequestFixture from './tagsRequest.fixture';

const [firstTag, secondTag, thirdTag] = tagsRequestFixture;

export default [
  {
    ...firstTag,
    _id: new Types.ObjectId(firstTag._id),
    createdAt: utilFixture.freezeDate,
    photos: [new Types.ObjectId(firstTag.photos[0])],
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...secondTag,
    _id: new Types.ObjectId(secondTag._id),
    createdAt: utilFixture.freezeDate,
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...thirdTag,
    _id: new Types.ObjectId(thirdTag._id),
    createdAt: utilFixture.freezeDate,
    updatedAt: utilFixture.freezeDate,
  },
];
