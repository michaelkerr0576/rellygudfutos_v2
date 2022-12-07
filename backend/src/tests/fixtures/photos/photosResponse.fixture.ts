import { Types } from 'mongoose';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';
import userRequestFixture from '../users/userRequest.fixture';
import utilFixture from '../util.fixture';

import photoImageDetailsFixture from './photoImageDetails.fixture';
import photosRequestFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = photosRequestFixture;
const [firstTag, secondTag, thirdTag] = tagsRequestFixture;

const adminPhotographer = {
  _id: new Types.ObjectId(userAdminRequestFixture._id),
  email: userAdminRequestFixture.email.toLowerCase(),
  name: userAdminRequestFixture.name,
};

const userPhotographer = {
  _id: new Types.ObjectId(userRequestFixture._id),
  email: userRequestFixture.email.toLowerCase(),
  name: userRequestFixture.name,
};

export default [
  {
    ...firstPhoto,
    __v: 0,
    _id: new Types.ObjectId(firstPhoto._id),
    createdAt: utilFixture.freezeDate,
    details: {
      ...firstPhoto.details,
      ...photoImageDetailsFixture,
      captureDate: new Date(firstPhoto.details.captureDate),
      imageTags: [
        { _id: new Types.ObjectId(firstTag._id), tag: firstTag.tag },
        { _id: new Types.ObjectId(secondTag._id), tag: secondTag.tag },
      ],
      photographer: adminPhotographer,
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
      ...photoImageDetailsFixture,
      captureDate: new Date(secondPhoto.details.captureDate),
      imageTags: [
        {
          _id: new Types.ObjectId(secondTag._id),
          tag: secondTag.tag,
        },
      ],
      photographer: userPhotographer,
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
      ...photoImageDetailsFixture,
      captureDate: new Date(thirdPhoto.details.captureDate),
      imageTags: [
        {
          _id: new Types.ObjectId(thirdTag._id),
          tag: thirdTag.tag,
        },
      ],
      photographer: adminPhotographer,
    },
    updatedAt: utilFixture.freezeDate,
  },
];
