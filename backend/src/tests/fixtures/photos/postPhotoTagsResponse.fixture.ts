import { Types } from 'mongoose';

import postTagsFixture from '../tags/postTags.fixture';
import utilFixture from '../util.fixture';

import postPhotoFixture from './postPhoto.fixture';

const [firstTag, secondTag] = postTagsFixture;
export default [
  {
    ...firstTag,
    _id: new Types.ObjectId(firstTag._id),
    createdAt: utilFixture.freezeDate,
    photos: [new Types.ObjectId(firstTag.photos[0]), new Types.ObjectId(postPhotoFixture._id)],
    updatedAt: utilFixture.freezeDate,
  },
  {
    ...secondTag,
    _id: new Types.ObjectId(secondTag._id),
    createdAt: utilFixture.freezeDate,
    photos: [new Types.ObjectId(postPhotoFixture._id)],
    updatedAt: utilFixture.freezeDate,
  },
];
