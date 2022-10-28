import tagsRequestFixture from '../tags/tagsRequest.fixture';

const [firstTag, secondTag] = tagsRequestFixture;

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
  limit: 1,
  page: 2,
  sort: {
    'details.captureDate': 1,
  },
  startIndex: 1,
};
