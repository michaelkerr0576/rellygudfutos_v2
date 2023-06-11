import { Types } from 'mongoose';

import userAdminRequestFixture from './userAdminRequest.fixture';

export default Types.ObjectId(userAdminRequestFixture._id);
