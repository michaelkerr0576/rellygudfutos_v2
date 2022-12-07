import photoImageDetailsFixture from './photoImageDetails.fixture';
import photoRequestFixture from './photoRequest.fixture';

export default {
  ...photoRequestFixture,
  details: {
    ...photoRequestFixture.details,
    ...photoImageDetailsFixture,
  },
};
