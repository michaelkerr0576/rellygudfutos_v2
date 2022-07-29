import { Types } from 'mongoose';

import { postTagFixture } from '../tags';
import utilFixture from '../util.fixture';

import postPhotoFixture from './postPhoto.fixture';

const imageTags = [
  {
    _id: new Types.ObjectId(postTagFixture._id),
    createdAt: utilFixture.freezeDate,
    tag: postTagFixture.tag,
    updatedAt: utilFixture.freezeDate,
  },
];

export default {
  ...postPhotoFixture,
  _id: new Types.ObjectId(postPhotoFixture._id),
  createdAt: utilFixture.freezeDate,
  updatedAt: utilFixture.freezeDate,
  details: {
    ...postPhotoFixture.details,
    captureDate: new Date(postPhotoFixture.details.captureDate),
    imageTags,
  },
};
