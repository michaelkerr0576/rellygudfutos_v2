import { Types } from 'mongoose';

import utilFixture from '../util.fixture';

import postTagsFixture from './postTags.fixture';

const [firstTag, secondTag] = postTagsFixture;

export default [
  {
    ...firstTag,
    _id: new Types.ObjectId(firstTag._id),
    createdAt: utilFixture.freezeDate,
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...secondTag,
    _id: new Types.ObjectId(secondTag._id),
    createdAt: utilFixture.freezeDate,
    updatedAt: utilFixture.freezeDate,
  },
];
