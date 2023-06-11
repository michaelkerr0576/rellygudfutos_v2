import { Types } from 'mongoose';

import userAdminRequestFixture from '../users/userAdminRequest.fixture';

export default Types.ObjectId(userAdminRequestFixture._id);
