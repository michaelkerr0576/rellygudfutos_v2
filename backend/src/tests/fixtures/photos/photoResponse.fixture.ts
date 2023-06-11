import { Types } from 'mongoose';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';
import * as utilFixture from '../util.fixture';

import photoImageFixture from './photoImage.fixture';
import photoRequestFixture from './photoRequest.fixture';

const [firstTag, secondTag] = tagsRequestFixture;

const tags = [
  {
    _id: Types.ObjectId(firstTag._id),
    tag: firstTag.tag,
  },
  {
    _id: Types.ObjectId(secondTag._id),
    tag: secondTag.tag,
  },
];

const photographer = {
  _id: Types.ObjectId(userAdminRequestFixture._id),
  email: userAdminRequestFixture.email.toLowerCase(),
  name: userAdminRequestFixture.name,
};

export default {
  ...photoRequestFixture,
  __v: 0,
  _id: Types.ObjectId(photoRequestFixture._id),
  captureDate: new Date(photoRequestFixture.captureDate),
  createdAt: utilFixture.freezeDate,
  image: photoImageFixture,
  photographer,
  tags,
  updatedAt: utilFixture.freezeDate,
};
