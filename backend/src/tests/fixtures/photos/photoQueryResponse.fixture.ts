import photoQueryFixture from './photoQuery.fixture';

const [firstTag, secondTag] = photoQueryFixture.tags;

export default {
  endIndex: 2,
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
        'details.imageTitle': {
          $regex: /test/i,
        },
      },
    ],
    'details.imageTags': {
      _id: [firstTag, secondTag],
    },
    'details.photographer': {
      _id: photoQueryFixture.user,
    },
  },
  limit: 1,
  page: 2,
  sort: {
    'details.captureDate': 1,
  },
  startIndex: 1,
};
