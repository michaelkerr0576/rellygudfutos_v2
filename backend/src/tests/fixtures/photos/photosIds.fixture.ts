import { Types } from 'mongoose';

import photosRequestFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = photosRequestFixture;

export default [
  new Types.ObjectId(firstPhoto._id),
  new Types.ObjectId(secondPhoto._id),
  new Types.ObjectId(thirdPhoto._id),
];
