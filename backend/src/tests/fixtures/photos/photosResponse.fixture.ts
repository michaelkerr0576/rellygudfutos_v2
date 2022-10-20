import { Types } from 'mongoose';

import postTagsFixture from '../tags/tagsRequest.fixture';
import utilFixture from '../util.fixture';

import postPhotosFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = postPhotosFixture;
const [firstTag, secondTag, thirdTag] = postTagsFixture;

export default [
  {
    ...firstPhoto,
    __v: 0,
    _id: new Types.ObjectId(firstPhoto._id),
    createdAt: utilFixture.freezeDate,
    details: {
      ...firstPhoto.details,
      captureDate: new Date(firstPhoto.details.captureDate),
      imageTags: [
        { _id: new Types.ObjectId(firstTag._id), tag: firstTag.tag },
        { _id: new Types.ObjectId(secondTag._id), tag: secondTag.tag },
      ],
    },
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...secondPhoto,
    __v: 0,
    _id: new Types.ObjectId(secondPhoto._id),
    createdAt: utilFixture.freezeDate,
    details: {
      ...secondPhoto.details,
      captureDate: new Date(secondPhoto.details.captureDate),
      imageTags: [
        {
          _id: new Types.ObjectId(secondTag._id),
          tag: secondTag.tag,
        },
      ],
    },
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...thirdPhoto,
    __v: 0,
    _id: new Types.ObjectId(thirdPhoto._id),
    createdAt: utilFixture.freezeDate,
    details: {
      ...thirdPhoto.details,
      captureDate: new Date(thirdPhoto.details.captureDate),
      imageTags: [
        {
          _id: new Types.ObjectId(thirdTag._id),
          tag: thirdTag.tag,
        },
      ],
    },
    updatedAt: utilFixture.freezeDate,
  },
];
