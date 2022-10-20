import { Types } from 'mongoose';

import postPhotoFixture from '@/tests/fixtures/photos/photoRequest.fixture';

export default new Types.ObjectId(postPhotoFixture._id);
