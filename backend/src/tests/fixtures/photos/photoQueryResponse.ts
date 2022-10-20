import * as enm from '@/ts/enums/db.enum';

import postTagsFixture from '../tags/postTags.fixture';

const [firstTag, secondTag] = postTagsFixture;

export default {
  endIndex: 6,
  filter: {
    $or: [
      {
        'details.captureLocation': {
          $regex: /test/i,
        },
      },
      {
        'details.imageCaption': {
          $regex: /test/i,
        },
      },
      {
        'details.imageTags.tag': {
          $regex: /test/i,
        },
      },
      {
        'details.imageTitle': {
          $regex: /test/i,
        },
      },
    ],
    'details.imageTags': {
      _id: [firstTag._id, secondTag._id],
    },
  },
  limit: 3,
  page: 2,
  sort: enm.PhotoSortOptions.RANDOM,
  startIndex: 3,
};
