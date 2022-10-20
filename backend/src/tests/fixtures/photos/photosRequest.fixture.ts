import * as enm from '@/ts/enums/db.enum';

import postTagsFixture from '../tags/tagsRequest.fixture';

const [firstTag, secondTag, thirdTag] = postTagsFixture;

export default [
  {
    _id: '41224d776a326fb40f000002',
    details: {
      captureDate: '2011-11-11T11:11:11.103Z',
      captureLocation: 'Test capture location 1',
      imageCaption: 'Test image caption 1',
      imageFile: 'testFile.jpg',
      imageSize: enm.ImageSize.LARGE,
      imageTags: [firstTag._id, secondTag._id],
      imageTitle: 'Test image title 1',
      originalImageName: 'testOriginalImageName.jpeg',
      storeLink: 'https:www.testStoreLink.html',
    },
    equipment: {
      cameraIso: '100',
      cameraName: 'Test camera name 1',
      lensAperture: 'f/1.8',
      lensFocalLength: '700mm',
      lensName: 'Test lens name 1',
      lensShutterSpeed: '1/1000',
    },
  },
  {
    _id: '41224d776a326fb40f000003',
    details: {
      captureDate: '2011-11-11T11:11:11.102Z',
      captureLocation: 'Test capture location 2',
      imageCaption: 'Test image caption 2',
      imageFile: 'testFile.jpg',
      imageSize: enm.ImageSize.MEDIUM,
      imageTags: [secondTag._id],
      imageTitle: 'Test image title 2',
      originalImageName: 'testOriginalImageName.jpeg',
      storeLink: 'https:www.testStoreLink.html',
    },
    equipment: {
      cameraIso: '100',
      cameraName: 'Test camera name 2',
      lensAperture: 'f/1.8',
      lensFocalLength: '700mm',
      lensName: 'Test lens name 2',
      lensShutterSpeed: '1/1000',
    },
  },
  {
    _id: '41224d776a326fb40f000004',
    details: {
      captureDate: '2011-11-11T11:11:11.101Z',
      captureLocation: 'Test capture location 3',
      imageCaption: 'Test image caption 3',
      imageFile: 'testFile.jpg',
      imageSize: enm.ImageSize.SMALL,
      imageTags: [thirdTag._id],
      imageTitle: 'Test image title 3',
      originalImageName: 'testOriginalImageName.jpeg',
      storeLink: 'https:www.testStoreLink.html',
    },
    equipment: {
      cameraIso: '100',
      cameraName: 'Test camera name 3',
      lensAperture: 'f/1.8',
      lensFocalLength: '700mm',
      lensName: 'Test lens name 3',
      lensShutterSpeed: '1/1000',
    },
  },
];
