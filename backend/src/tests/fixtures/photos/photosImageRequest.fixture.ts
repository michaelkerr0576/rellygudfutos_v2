import photoImageFixture from './photoImage.fixture';
import photosRequestFixture from './photosRequest.fixture';

const [firstPhoto, secondPhoto, thirdPhoto] = photosRequestFixture;

export default [
  {
    ...firstPhoto,
    image: photoImageFixture,
  },
  {
    ...secondPhoto,
    image: photoImageFixture,
  },
  {
    ...thirdPhoto,
    image: photoImageFixture,
  },
];
