import { Types } from 'mongoose';

import photoRequestFixture from '@/tests/fixtures/photos/photoRequest.fixture';

const [firstTag, secondTag] = photoRequestFixture.details.imageTags;

export default [new Types.ObjectId(firstTag), new Types.ObjectId(secondTag)];
