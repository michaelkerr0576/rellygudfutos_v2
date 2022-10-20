import { Types } from 'mongoose';

import postTagsFixture from '@/tests/fixtures/tags/tagsRequest.fixture';

const [firstTag, secondTag, thirdTag] = postTagsFixture;

export default [
  new Types.ObjectId(firstTag._id),
  new Types.ObjectId(secondTag._id),
  new Types.ObjectId(thirdTag._id),
];
