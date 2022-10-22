import * as enm from '@/ts/enums/db.enum';

import postTagsFixture from '../tags/tagsRequest.fixture';

const [firstTag, secondTag] = postTagsFixture;

export default {
  limit: 1,
  page: 2,
  search: 'test',
  sort: enm.PhotoSortOptions.OLDEST,
  tags: [firstTag._id, secondTag._id],
};
