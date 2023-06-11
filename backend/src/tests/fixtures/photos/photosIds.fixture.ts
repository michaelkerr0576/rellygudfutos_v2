import { Types } from 'mongoose';

import photosRequestFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = photosRequestFixture;

export default [
  Types.ObjectId(firstPhoto._id),
  Types.ObjectId(secondPhoto._id),
  Types.ObjectId(thirdPhoto._id),
];
