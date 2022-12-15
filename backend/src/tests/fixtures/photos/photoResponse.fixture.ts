import { Types } from 'mongoose';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';
import * as utilFixture from '../util.fixture';

import photoImageDetailsFixture from './photoImageDetails.fixture';
import photoRequestFixture from './photoRequest.fixture';

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
  ...photoRequestFixture,
  __v: 0,
  _id: new Types.ObjectId(photoRequestFixture._id),
  createdAt: utilFixture.freezeDate,
  details: {
    ...photoRequestFixture.details,
    ...photoImageDetailsFixture,
    captureDate: new Date(photoRequestFixture.details.captureDate),
    imageTags,
    photographer,
  },
  updatedAt: utilFixture.freezeDate,
};
