import { Types } from 'mongoose';

import postTagFixture from '../tags/postTag.fixture';
import utilFixture from '../util.fixture';

import postPhotosFixture from './postPhotos.fixture';

const imageTags = [
  {
    _id: new Types.ObjectId(postTagFixture._id),
    tag: postTagFixture.tag,
  },
];

const [firstPhoto, secondPhoto] = postPhotosFixture;

export default [
  {
    ...firstPhoto,
    __v: 0,
    _id: new Types.ObjectId(firstPhoto._id),
    createdAt: utilFixture.freezeDate,
    details: {
      ...firstPhoto.details,
      captureDate: new Date(firstPhoto.details.captureDate),
      imageTags,
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
      imageTags,
    },
    updatedAt: utilFixture.freezeDate,
  },
];
