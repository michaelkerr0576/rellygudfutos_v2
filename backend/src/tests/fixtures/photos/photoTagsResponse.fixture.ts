import { Types } from 'mongoose';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import * as utilFixture from '../util.fixture';

import photoFixture from './photoRequest.fixture';

const [firstTag, secondTag] = tagsRequestFixture;

export default [
  {
    ...firstTag,
    _id: new Types.ObjectId(firstTag._id),
    createdAt: utilFixture.freezeDate,
    photos: [new Types.ObjectId(firstTag.photos[0]), new Types.ObjectId(photoFixture._id)],
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...secondTag,
    _id: new Types.ObjectId(secondTag._id),
    createdAt: utilFixture.freezeDate,
    photos: [new Types.ObjectId(photoFixture._id)],
    updatedAt: utilFixture.freezeDate,
  },
];
