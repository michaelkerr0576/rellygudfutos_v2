import { Types } from 'mongoose';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';
import utilFixture from '../util.fixture';

import postPhotoFixture from './photoRequest.fixture';

const [firstTag, secondTag] = tagsRequestFixture;

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

const photographer = {
  _id: new Types.ObjectId(userAdminRequestFixture._id),
  email: userAdminRequestFixture.email.toLowerCase(),
  name: userAdminRequestFixture.name,
};

export default {
  ...postPhotoFixture,
  __v: 0,
  _id: new Types.ObjectId(postPhotoFixture._id),
  createdAt: utilFixture.freezeDate,
  details: {
    ...postPhotoFixture.details,
    captureDate: new Date(postPhotoFixture.details.captureDate),
    imageTags,
    photographer,
  },
  updatedAt: utilFixture.freezeDate,
};
