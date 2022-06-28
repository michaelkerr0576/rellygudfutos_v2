import {
  postPhotoEnumFixture,
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
      const photo = new PhotoModel({});

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
        await photo.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expectedRequiredPaths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(
            `Path \`${path}\` is required.`,
          );
        });

        expect(errors['details.imageTags'].properties.message).toEqual(
          'Validator failed for path `details.imageTags` with value ``',
        );
      }
    });

    test('Expect to validate minLength for the relevant properties in PhotoModel', async () => {
      const photo = new PhotoModel(postPhotoMinLengthFixture);

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
        await photo.save();
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
      const photo = new PhotoModel(postPhotoMaxLengthFixture);

      const expectedMaxLength8Paths = [
        'equipment.cameraIso',
        'equipment.lensAperture',
        'equipment.lensFocalLength',
        'equipment.lensShutterSpeed',
      ];
      const expectedMaxLength51Paths = [
        'details.imageTitle',
        'equipment.cameraName',
        'equipment.lensName',
      ];

      try {
        await photo.save();
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
      const photo = new PhotoModel(postPhotoEnumFixture);

      try {
        await photo.save();
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
      const photo = new PhotoModel(postPhotoRegexFixture);

      try {
        await photo.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expect(errors['details.imageFile'].properties.message).toEqual(
          'Validator failed for path `details.imageFile` with value `testfile.ooo`',
        );
        expect(errors['details.storeLink'].properties.message).toEqual(
          'Validator failed for path `details.storeLink` with value `http://www.futos`',
        );
        expect(errors['details.originalImageName'].properties.message).toEqual(
          'Validator failed for path `details.originalImageName` with value `originaltestfile.hhh`',
        );
        expect(errors['equipment.cameraIso'].properties.message).toEqual(
          'Validator failed for path `equipment.cameraIso` with value `string`',
        );
        expect(errors['equipment.lensAperture'].properties.message).toEqual(
          'Validator failed for path `equipment.lensAperture` with value `a/1.2`',
        );
        expect(errors['equipment.lensFocalLength'].properties.message).toEqual(
          'Validator failed for path `equipment.lensFocalLength` with value `100nn`',
        );
        expect(errors['equipment.lensShutterSpeed'].properties.message).toEqual(
          'Validator failed for path `equipment.lensShutterSpeed` with value `1.200`',
        );
      }
    });

    test('Expect to validate and trim the relevant properties in PhotoModel', async () => {
      const photo = new PhotoModel(postPhotoTrimFixture);

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
        await photo.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        expectedRequiredPaths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(
            `Path \`${path}\` is required.`,
          );
        });

        expectedMinLengthPaths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(
            `Path \`${path}\` (\`1\`) is shorter than the minimum allowed length (2).`,
          );
        });
      }
    });
  });
});
