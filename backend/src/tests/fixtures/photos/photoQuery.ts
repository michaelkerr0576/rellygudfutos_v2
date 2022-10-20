import * as enm from '@/ts/enums/db.enum';

import postTagsFixture from '../tags/postTags.fixture';

const [firstTag, secondTag] = postTagsFixture;

export default {
  limit: 3,
  page: 2,
  search: 'test',
  sort: enm.PhotoSortOptions.RANDOM,
  tags: [firstTag._id, secondTag._id],
};
