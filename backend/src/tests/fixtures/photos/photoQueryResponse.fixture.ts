import photoQueryFixture from './photoQuery.fixture';

const [firstTag, secondTag] = photoQueryFixture.tagIds;

export default {
  endIndex: 2,
  filter: {
    $or: [
      {
        caption: {
          $regex: /test/i,
        },
      },
      {
        location: {
          $regex: /test/i,
        },
      },
      {
        title: {
          $regex: /test/i,
        },
      },
    ],
    photographer: {
      _id: photoQueryFixture.photographerId,
    },
    tags: {
      _id: [firstTag, secondTag],
    },
  },
  limit: 1,
  page: 2,
  sort: {
    captureDate: 1,
  },
  startIndex: 1,
};
