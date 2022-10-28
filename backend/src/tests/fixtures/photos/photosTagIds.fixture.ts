import { Types } from 'mongoose';

import photosRequestFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = photosRequestFixture;

const [firstPhotoTag1, firstPhotoTag2] = firstPhoto.details.imageTags;
const [secondPhotoTag1] = secondPhoto.details.imageTags;
const [thirdPhotoTag1] = thirdPhoto.details.imageTags;

const firstPhotoImageTags = [new Types.ObjectId(firstPhotoTag1), new Types.ObjectId(firstPhotoTag2)];
const secondPhotoImageTags = [new Types.ObjectId(secondPhotoTag1)];
const thirdPhotoImageTags = [new Types.ObjectId(thirdPhotoTag1)];

export default [firstPhotoImageTags, secondPhotoImageTags, thirdPhotoImageTags];
