import { Types } from 'mongoose';

import photosRequestFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = photosRequestFixture;

const [firstPhotoTag1, firstPhotoTag2] = firstPhoto.tags;
const [secondPhotoTag1] = secondPhoto.tags;
const [thirdPhotoTag1] = thirdPhoto.tags;

const firstPhotoImageTags = [Types.ObjectId(firstPhotoTag1), Types.ObjectId(firstPhotoTag2)];
const secondPhotoImageTags = [Types.ObjectId(secondPhotoTag1)];
const thirdPhotoImageTags = [Types.ObjectId(thirdPhotoTag1)];

export default [firstPhotoImageTags, secondPhotoImageTags, thirdPhotoImageTags];
