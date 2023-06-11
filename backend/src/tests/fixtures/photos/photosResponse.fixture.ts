import { Types } from 'mongoose';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';
import userRequestFixture from '../users/userRequest.fixture';
import * as utilFixture from '../util.fixture';

import photoImageFixture from './photoImage.fixture';
import photosRequestFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = photosRequestFixture;
const [firstTag, secondTag, thirdTag] = tagsRequestFixture;

const adminPhotographer = {
  _id: Types.ObjectId(userAdminRequestFixture._id),
  email: userAdminRequestFixture.email.toLowerCase(),
  name: userAdminRequestFixture.name,
};

const userPhotographer = {
  _id: Types.ObjectId(userRequestFixture._id),
  email: userRequestFixture.email.toLowerCase(),
  name: userRequestFixture.name,
};

export default [
  {
    ...firstPhoto,
    __v: 0,
    _id: Types.ObjectId(firstPhoto._id),
    captureDate: new Date(firstPhoto.captureDate),
    createdAt: utilFixture.freezeDate,
    image: photoImageFixture,
    photographer: adminPhotographer,
    tags: [
      { _id: Types.ObjectId(firstTag._id), tag: firstTag.tag },
      { _id: Types.ObjectId(secondTag._id), tag: secondTag.tag },
    ],
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...secondPhoto,
    __v: 0,
    _id: Types.ObjectId(secondPhoto._id),
    captureDate: new Date(secondPhoto.captureDate),
    createdAt: utilFixture.freezeDate,
    image: photoImageFixture,
    photographer: userPhotographer,
    tags: [
      {
        _id: Types.ObjectId(secondTag._id),
        tag: secondTag.tag,
      },
    ],
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...thirdPhoto,
    __v: 0,
    _id: Types.ObjectId(thirdPhoto._id),
    captureDate: new Date(thirdPhoto.captureDate),
    createdAt: utilFixture.freezeDate,
    image: photoImageFixture,
    photographer: adminPhotographer,
    tags: [
      {
        _id: Types.ObjectId(thirdTag._id),
        tag: thirdTag.tag,
      },
    ],
    updatedAt: utilFixture.freezeDate,
  },
];
