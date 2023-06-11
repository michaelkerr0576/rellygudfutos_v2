import { Types } from 'mongoose';

import photoRequestFixture from './photoRequest.fixture';

const [firstTag, secondTag] = photoRequestFixture.tags;

export default [Types.ObjectId(firstTag), Types.ObjectId(secondTag)];
