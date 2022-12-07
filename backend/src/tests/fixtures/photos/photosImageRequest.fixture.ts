import photoImageDetailsFixture from './photoImageDetails.fixture';
import photosRequestFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = photosRequestFixture;

export default [
  {
    ...firstPhoto,
    details: {
      ...firstPhoto.details,
      ...photoImageDetailsFixture,
    },
  },
  {
    ...secondPhoto,
    details: {
      ...secondPhoto.details,
      ...photoImageDetailsFixture,
    },
  },
  {
    ...thirdPhoto,
    details: {
      ...thirdPhoto.details,
      ...photoImageDetailsFixture,
    },
  },
];
