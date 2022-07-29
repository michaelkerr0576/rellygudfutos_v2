import { Types } from 'mongoose';

import { postTagFixture } from '../tags';
import utilFixture from '../util.fixture';

import postPhotosFixture from './postPhotos.fixture';

const imageTags = [
  {
    _id: new Types.ObjectId(postTagFixture._id),
    createdAt: utilFixture.freezeDate,
    tag: postTagFixture.tag,
    updatedAt: utilFixture.freezeDate,
  },
];

const [firstPhoto, secondPhoto] = postPhotosFixture;

export default [
  {
    ...firstPhoto,
    _id: new Types.ObjectId(firstPhoto._id),
    createdAt: utilFixture.freezeDate,
    updatedAt: utilFixture.freezeDate,
    details: {
      ...firstPhoto.details,
      captureDate: new Date(firstPhoto.details.captureDate),
      imageTags,
    },
  },
  {
    ...secondPhoto,
    _id: new Types.ObjectId(secondPhoto._id),
    createdAt: utilFixture.freezeDate,
    updatedAt: utilFixture.freezeDate,
    details: {
      ...secondPhoto.details,
      captureDate: new Date(secondPhoto.details.captureDate),
      imageTags,
    },
  },
];
