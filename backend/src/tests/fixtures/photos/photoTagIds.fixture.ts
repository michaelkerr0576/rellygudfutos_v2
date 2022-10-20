import { Types } from 'mongoose';

import postPhotoFixture from '@/tests/fixtures/photos/photoRequest.fixture';

const [firstTag, secondTag] = postPhotoFixture.details.imageTags;

export default [new Types.ObjectId(firstTag), new Types.ObjectId(secondTag)];
