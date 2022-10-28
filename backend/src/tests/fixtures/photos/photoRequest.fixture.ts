import * as enm from '@/ts/enums/db.enum';

import tagsRequestFixture from '../tags/tagsRequest.fixture';
import userAdminRequestFixture from '../users/userAdminRequest.fixture';

const [firstTag, secondTag] = tagsRequestFixture;

export default {
  _id: '41224d776a326fb40f000002',
  details: {
    captureDate: '2011-11-11T11:11:11.111Z',
    captureLocation: 'Test capture location',
    imageCaption: 'Test image caption',
    imageFile: 'testFile.jpg',
    imageSize: enm.ImageSize.LARGE,
    imageTags: [firstTag._id, secondTag._id],
    imageTitle: 'Test image title',
    originalImageName: 'testOriginalImageName.jpeg',
    photographer: userAdminRequestFixture._id,
    storeLink: 'https:www.testStoreLink.html',
  },
  equipment: {
    cameraIso: '100',
    cameraName: 'Test camera name',
    lensAperture: 'f/1.8',
    lensFocalLength: '700mm',
    lensName: 'Test lens name',
    lensShutterSpeed: '1/1000',
  },
};
