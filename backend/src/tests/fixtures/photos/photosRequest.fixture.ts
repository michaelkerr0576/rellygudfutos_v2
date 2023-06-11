import * as enm from '@/ts/enums/db.enum';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';
import userRequestFixture from '../users/userRequest.fixture';

const [firstTag, secondTag, thirdTag] = tagsRequestFixture;

export default [
  {
    _id: '41224d776a326fb40f000002',
    aspectRatio: enm.PhotoAspectRatio.LANDSCAPE,
    caption: 'Test image caption 1',
    captureDate: '2011-11-11T11:11:11.103Z',
    equipment: {
      camera: 'Test camera name 1',
      lens: 'Test lens name 1',
    },
    location: 'Test capture location 1',
    photographer: userAdminRequestFixture._id,
    settings: {
      aperture: 'f/1.8',
      focalLength: '700mm',
      iso: '100',
      shutterSpeed: '1/1000',
    },
    storeUrl: 'https:www.testStoreLink.html',
    tags: [firstTag._id, secondTag._id],
    title: 'Test image title 1',
  },
  {
    _id: '41224d776a326fb40f000003',
    aspectRatio: enm.PhotoAspectRatio.LANDSCAPE,
    caption: 'Test image caption 2',
    captureDate: '2011-11-11T11:11:11.102Z',
    equipment: {
      camera: 'Test camera name 2',
      lens: 'Test lens name 2',
    },
    location: 'Test capture location 2',
    photographer: userRequestFixture._id,
    settings: {
      aperture: 'f/1.8',
      focalLength: '700mm',
      iso: '100',
      shutterSpeed: '1/1000',
    },
    storeUrl: 'https:www.testStoreLink.html',
    tags: [secondTag._id],
    title: 'Test image title 2',
  },
  {
    _id: '41224d776a326fb40f000004',
    aspectRatio: enm.PhotoAspectRatio.LANDSCAPE,
    caption: 'Test image caption 3',
    captureDate: '2011-11-11T11:11:11.101Z',
    equipment: {
      camera: 'Test camera name 3',
      lens: 'Test lens name 3',
    },
    location: 'Test capture location 3',
    photographer: userAdminRequestFixture._id,
    settings: {
      aperture: 'f/1.8',
      focalLength: '700mm',
      iso: '100',
      shutterSpeed: '1/1000',
    },
    storeUrl: 'https:www.testStoreLink.html',
    tags: [thirdTag._id],
    title: 'Test image title 3',
  },
];
