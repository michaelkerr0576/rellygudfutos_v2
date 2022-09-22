import { Types } from 'mongoose';

import { postTagsFixture } from '../tags';
import utilFixture from '../util.fixture';

import postPhotoFixture from './postPhoto.fixture';

const [firstTag, secondTag] = postTagsFixture;
const imageTags = [
  {
    _id: new Types.ObjectId(firstTag._id),
    createdAt: utilFixture.freezeDate,
    tag: firstTag.tag,
    updatedAt: utilFixture.freezeDate,
  },
  {
    _id: new Types.ObjectId(secondTag._id),
    createdAt: utilFixture.freezeDate,
    tag: secondTag.tag,
    updatedAt: utilFixture.freezeDate,
  },
];

export default {
  ...postPhotoFixture,
  _id: new Types.ObjectId(postPhotoFixture._id),
  createdAt: utilFixture.freezeDate,
  details: {
    ...postPhotoFixture.details,
    captureDate: new Date(postPhotoFixture.details.captureDate),
    imageTags,
  },
  updatedAt: utilFixture.freezeDate,
};
