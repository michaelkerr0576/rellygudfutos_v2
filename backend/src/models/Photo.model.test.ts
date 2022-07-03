import {
  postPhotoEnumFixture,
  postPhotoFixture,
  postPhotoMaxLengthFixture,
  postPhotoMinLengthFixture,
  postPhotoRegexFixture,
  postPhotoTrimFixture,
} from '@/tests/fixtures/photos';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

import PhotoModel from './Photo.model';

describe('Photo Model', () => {
  beforeAll(async () => mongoMemoryServer.connectDB());
  afterAll(async () => mongoMemoryServer.disconnectDB);

  describe('Validation', () => {
    test('Expect to validate required for the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel({});

      const expectedRequiredPaths = [
        'details.captureLocation',
        'details.imageCaption',
        'details.imageFile',
        'details.imageTitle',
        'details.originalImageName',
        'details.storeLink',
        'equipment.cameraIso',
        'equipment.cameraName',
        'equipment.lensAperture',
        'equipment.lensFocalLength',
        'equipment.lensName',
        'equipment.lensShutterSpeed',
      ];

      try {
        await invalidPhoto.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expectedRequiredPaths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(`Path \`${path}\` is required.`);
        });

        expect(errors['details.imageTags'].properties.message).toEqual(
          'Validator failed for path `details.imageTags` with value ``',
        );
      }
    });

    test('Expect to validate minLength for the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel(postPhotoMinLengthFixture);

      const expectedMinLengthPaths = [
        'details.captureLocation',
        'details.imageCaption',
        'details.imageTitle',
        'equipment.cameraIso',
        'equipment.cameraName',
        'equipment.lensAperture',
        'equipment.lensFocalLength',
        'equipment.lensName',
        'equipment.lensShutterSpeed',
      ];

      try {
        await invalidPhoto.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expectedMinLengthPaths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(
            `Path \`${path}\` (\`1\`) is shorter than the minimum allowed length (2).`,
          );
        });
      }
    });

    test('Expect to validate maxLength for the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel(postPhotoMaxLengthFixture);

      const expectedMaxLength8Paths = [
        'equipment.cameraIso',
        'equipment.lensAperture',
        'equipment.lensFocalLength',
        'equipment.lensShutterSpeed',
      ];
      const expectedMaxLength51Paths = ['details.imageTitle', 'equipment.cameraName', 'equipment.lensName'];

      try {
        await invalidPhoto.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expectedMaxLength8Paths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(
            `Path \`${path}\` (\`${utilFixture.chars8}\`) is longer than the maximum allowed length (7).`,
          );
        });

        expectedMaxLength51Paths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(
            `Path \`${path}\` (\`${utilFixture.chars51}\`) is longer than the maximum allowed length (50).`,
          );
        });

        expect(errors['details.captureLocation'].properties.message).toEqual(
          `Path \`details.captureLocation\` (\`${utilFixture.chars101}\`) is longer than the maximum allowed length (100).`,
        );
        expect(errors['details.imageCaption'].properties.message).toEqual(
          `Path \`details.imageCaption\` (\`${utilFixture.chars301}\`) is longer than the maximum allowed length (300).`,
        );
      }
    });

    test('Expect to validate enum for the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel(postPhotoEnumFixture);

      try {
        await invalidPhoto.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expect(errors['details.imageSize'].properties.message).toEqual(
          '`xSmall` is not a valid enum value for path `details.imageSize`.',
        );
      }
    });

    test('Expect to validate regex for the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel(postPhotoRegexFixture);

      try {
        await invalidPhoto.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expect(errors['details.imageFile'].properties.message).toEqual(
          'Path `details.imageFile` is invalid (testfile.ooo).',
        );
        expect(errors['details.storeLink'].properties.message).toEqual(
          'Path `details.storeLink` is invalid (http://www.futos).',
        );
        expect(errors['details.originalImageName'].properties.message).toEqual(
          'Path `details.originalImageName` is invalid (originaltestfile.hhh).',
        );
        expect(errors['equipment.cameraIso'].properties.message).toEqual(
          'Path `equipment.cameraIso` is invalid (string).',
        );
        expect(errors['equipment.lensAperture'].properties.message).toEqual(
          'Path `equipment.lensAperture` is invalid (a/1.2).',
        );
        expect(errors['equipment.lensFocalLength'].properties.message).toEqual(
          'Path `equipment.lensFocalLength` is invalid (100nn).',
        );
        expect(errors['equipment.lensShutterSpeed'].properties.message).toEqual(
          'Path `equipment.lensShutterSpeed` is invalid (1.200).',
        );
      }
    });

    test('Expect to validate and trim the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel(postPhotoTrimFixture);

      const expectedRequiredPaths = [
        'details.captureLocation',
        'details.imageCaption',
        'details.imageFile',
        'details.imageTitle',
        'details.originalImageName',
        'details.storeLink',
      ];
      const expectedMinLengthPaths = [
        'equipment.cameraIso',
        'equipment.cameraName',
        'equipment.lensAperture',
        'equipment.lensFocalLength',
        'equipment.lensName',
        'equipment.lensShutterSpeed',
      ];

      try {
        await invalidPhoto.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expectedRequiredPaths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(`Path \`${path}\` is required.`);
        });

        expectedMinLengthPaths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(
            `Path \`${path}\` (\`1\`) is shorter than the minimum allowed length (2).`,
          );
        });
      }
    });

    test('Expect no validation errors for a valid PhotoModel', async () => {
      const validPhoto = new PhotoModel(postPhotoFixture);

      const savedValidPhoto = await validPhoto.save();

      const { _id: expectedId, details: expectedDetails, equipment: expectedEquipment } = postPhotoFixture;
      const { _id: actualId, details: actualDetails, equipment: actualEquipment } = savedValidPhoto;

      expect(savedValidPhoto).toBeTruthy();
      expect(actualId.toString()).toEqual(expectedId.toString());

      // photo details
      expect(actualDetails.captureDate).toEqual(new Date(expectedDetails.captureDate));
      expect(actualDetails.captureLocation).toEqual(expectedDetails.captureLocation);
      expect(actualDetails.imageCaption).toEqual(expectedDetails.imageCaption);
      expect(actualDetails.imageFile).toEqual(expectedDetails.imageFile);
      expect(actualDetails.imageSize).toEqual(expectedDetails.imageSize);
      expect(actualDetails.imageTags.toString()).toEqual(expectedDetails.imageTags.toString());
      expect(actualDetails.imageTitle).toEqual(expectedDetails.imageTitle);
      expect(actualDetails.originalImageName).toEqual(expectedDetails.originalImageName);
      expect(actualDetails.storeLink).toEqual(expectedDetails.storeLink);

      // photo equipment
      expect(actualEquipment.cameraIso).toEqual(expectedEquipment.cameraIso);
      expect(actualEquipment.cameraName).toEqual(expectedEquipment.cameraName);
      expect(actualEquipment.lensAperture).toEqual(expectedEquipment.lensAperture);
      expect(actualEquipment.lensFocalLength).toEqual(expectedEquipment.lensFocalLength);
      expect(actualEquipment.lensName).toEqual(expectedEquipment.lensName);
      expect(actualEquipment.lensShutterSpeed).toEqual(expectedEquipment.lensShutterSpeed);
    });
  });
});
