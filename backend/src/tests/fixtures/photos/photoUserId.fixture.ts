import { Types } from 'mongoose';

import userAdminRequestFixture from '../users/userAdminRequest.fixture';

export default new Types.ObjectId(userAdminRequestFixture._id);
