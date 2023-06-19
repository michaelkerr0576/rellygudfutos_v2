import * as enm from '@/types/enums/db.enum';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';

const [firstTag, secondTag] = tagsRequestFixture;

export default {
  limit: 1,
  page: 2,
  search: 'test',
  sort: enm.PhotoSortOptions.OLDEST,
  tags: [firstTag._id, secondTag._id],
  user: userAdminRequestFixture._id,
};
