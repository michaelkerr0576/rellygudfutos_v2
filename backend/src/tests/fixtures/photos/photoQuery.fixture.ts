import * as enm from '@/types/enums/db.enum';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';

const [firstTag, secondTag] = tagsRequestFixture;

export default {
  limit: 1,
  page: 2,
  photographerId: userAdminRequestFixture._id,
  search: 'test',
  sort: enm.PhotoSortOptions.OLDEST,
  tagIds: [firstTag._id, secondTag._id],
};
