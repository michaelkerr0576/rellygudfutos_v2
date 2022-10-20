import { Types } from 'mongoose';

import postTagsFixture from '../tags/tagsRequest.fixture';
import utilFixture from '../util.fixture';

import postPhotoFixture from './photoRequest.fixture';

const [firstTag, secondTag] = postTagsFixture;

const imageTags = [
  {
    _id: new Types.ObjectId(firstTag._id),
    tag: firstTag.tag,
  },
  {
    _id: new Types.ObjectId(secondTag._id),
    tag: secondTag.tag,
  },
];

export default {
  ...postPhotoFixture,
  __v: 0,
  _id: new Types.ObjectId(postPhotoFixture._id),
  createdAt: utilFixture.freezeDate,
  details: {
    ...postPhotoFixture.details,
    captureDate: new Date(postPhotoFixture.details.captureDate),
    imageTags,
  },
  updatedAt: utilFixture.freezeDate,
};
