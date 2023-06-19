import * as enm from '@/types/enums/db.enum';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';

const [firstTag, secondTag] = tagsRequestFixture;

export default {
  _id: '41224d776a326fb40f000002',
  aspectRatio: enm.PhotoAspectRatio.LANDSCAPE,
  caption: 'Test image caption',
  captureDate: '2011-11-11T11:11:11.111Z',
  equipment: {
    camera: 'Test camera name',
    lens: 'Test lens name',
  },
  location: 'Test capture location',
  photographer: userAdminRequestFixture._id,
  settings: {
    aperture: 'f/1.8',
    focalLength: '700mm',
    iso: '100',
    shutterSpeed: '1/1000',
  },
  storeUrl: 'https:www.testStoreLink.html',
  tags: [firstTag._id, secondTag._id],
  title: 'Test image title',
};
