import { Types } from 'mongoose';

import userAdminRequestFixture from './userAdminRequest.fixture';

export default new Types.ObjectId(userAdminRequestFixture._id);
