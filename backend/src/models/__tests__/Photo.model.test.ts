import photoEnumFixture from '@/tests/fixtures/photos/negative/photoEnum.fixture';
import photoMaxLengthFixture from '@/tests/fixtures/photos/negative/photoMaxLength.fixture';
import photoMinLengthFixture from '@/tests/fixtures/photos/negative/photoMinLength.fixture';
import photoRegexFixture from '@/tests/fixtures/photos/negative/photoRegex.fixture';
import photoTrimFixture from '@/tests/fixtures/photos/negative/photoTrim.fixture';
import photoRequestFixture from '@/tests/fixtures/photos/photoRequest.fixture';
import * as utilFixture from '@/tests/fixtures/util.fixture';
import * as mongoMemoryServer from '@/tests/mongoMemoryServer';

import PhotoModel from '../Photo.model';

describe('Photo Model', () => {
  beforeAll(async () => mongoMemoryServer.connectDB());
  afterAll(async () => mongoMemoryServer.disconnectDB());

  describe('Validation', () => {
    test('Expect to validate required for the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel({});

      const expectedRequiredPaths = [
        'details.captureLocation',
        'details.imageCaption',
        'details.imageTags',
        'details.imageTitle',
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
      }
    });

    test('Expect to validate minLength for the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel(photoMinLengthFixture);

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
      const invalidPhoto = new PhotoModel(photoMaxLengthFixture);

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
      const invalidPhoto = new PhotoModel(photoEnumFixture);

      try {
        await invalidPhoto.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expect(errors['details.imageSize'].properties.message).toEqual(
          '`XSMALL` is not a valid enum value for path `details.imageSize`.',
        );
      }
    });

    test('Expect to validate regex for the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel(photoRegexFixture);

      try {
        await invalidPhoto.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expect(errors['details.storeLink'].properties.message).toEqual(
          'Path `details.storeLink` is invalid (http://www.futos).',
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
      const invalidPhoto = new PhotoModel(photoTrimFixture);

      const expectedRequiredPaths = [
        'details.captureLocation',
        'details.imageCaption',
        'details.imageTags',
        'details.imageTitle',
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
      const validPhoto = new PhotoModel(photoRequestFixture);

      const savedValidPhoto = await validPhoto.save();

      const { _id: expectedId, details: expectedDetails, equipment: expectedEquipment } = photoRequestFixture;
      const { _id: actualId, details: actualDetails, equipment: actualEquipment } = savedValidPhoto;

      expect(savedValidPhoto).toBeTruthy();
      expect(actualId.toString()).toEqual(expectedId.toString());

      // * Photo details
      expect(actualDetails.captureDate).toEqual(new Date(expectedDetails.captureDate));
      expect(actualDetails.captureLocation).toEqual(expectedDetails.captureLocation);
      expect(actualDetails.imageCaption).toEqual(expectedDetails.imageCaption);
      expect(actualDetails.imageSize).toEqual(expectedDetails.imageSize);
      expect(actualDetails.imageTags.toString()).toEqual(expectedDetails.imageTags.toString());
      expect(actualDetails.imageTitle).toEqual(expectedDetails.imageTitle);
      expect(actualDetails.storeLink).toEqual(expectedDetails.storeLink);

      // * Photo equipment
      expect(actualEquipment.cameraIso).toEqual(expectedEquipment.cameraIso);
      expect(actualEquipment.cameraName).toEqual(expectedEquipment.cameraName);
      expect(actualEquipment.lensAperture).toEqual(expectedEquipment.lensAperture);
      expect(actualEquipment.lensFocalLength).toEqual(expectedEquipment.lensFocalLength);
      expect(actualEquipment.lensName).toEqual(expectedEquipment.lensName);
      expect(actualEquipment.lensShutterSpeed).toEqual(expectedEquipment.lensShutterSpeed);
    });
  });
});
