import { Types } from 'mongoose';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';
import utilFixture from '../util.fixture';

import photosRequestFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = photosRequestFixture;
const [firstTag, secondTag, thirdTag] = tagsRequestFixture;

const photographer = {
  _id: new Types.ObjectId(userAdminRequestFixture._id),
  email: userAdminRequestFixture.email.toLowerCase(),
  name: userAdminRequestFixture.name,
};

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
      photographer,
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
      photographer,
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
      photographer,
    },
    updatedAt: utilFixture.freezeDate,
  },
];
