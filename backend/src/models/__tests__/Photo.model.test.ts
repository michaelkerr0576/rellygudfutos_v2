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
        'caption',
        'equipment.camera',
        'equipment.lens',
        'location',
        'settings.aperture',
        'settings.focalLength',
        'settings.iso',
        'settings.shutterSpeed',
        'storeUrl',
        'tags',
        'title',
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
        'caption',
        'equipment.camera',
        'equipment.lens',
        'location',
        'settings.aperture',
        'settings.focalLength',
        'settings.iso',
        'settings.shutterSpeed',
        'title',
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
        'settings.aperture',
        'settings.focalLength',
        'settings.iso',
        'settings.shutterSpeed',
      ];
      const expectedMaxLength51Paths = ['title', 'equipment.camera', 'equipment.lens'];

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

        expect(errors.location.properties.message).toEqual(
          `Path \`location\` (\`${utilFixture.chars101}\`) is longer than the maximum allowed length (100).`,
        );
        expect(errors.caption.properties.message).toEqual(
          `Path \`caption\` (\`${utilFixture.chars301}\`) is longer than the maximum allowed length (300).`,
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

        expect(errors.aspectRatio.properties.message).toEqual(
          '`SQUARE` is not a valid enum value for path `aspectRatio`.',
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

        expect(errors.storeUrl.properties.message).toEqual('Path `storeUrl` is invalid (http://www.futos).');
        expect(errors['settings.iso'].properties.message).toEqual('Path `settings.iso` is invalid (string).');
        expect(errors['settings.aperture'].properties.message).toEqual(
          'Path `settings.aperture` is invalid (a/1.2).',
        );
        expect(errors['settings.focalLength'].properties.message).toEqual(
          'Path `settings.focalLength` is invalid (100nn).',
        );
        expect(errors['settings.shutterSpeed'].properties.message).toEqual(
          'Path `settings.shutterSpeed` is invalid (1.200).',
        );
      }
    });

    test('Expect to validate and trim the relevant properties in PhotoModel', async () => {
      const invalidPhoto = new PhotoModel(photoTrimFixture);

      const expectedRequiredPaths = ['caption', 'location', 'storeUrl', 'tags', 'title'];
      const expectedMinLengthPaths = [
        'equipment.camera',
        'equipment.lens',
        'settings.aperture',
        'settings.focalLength',
        'settings.iso',
        'settings.shutterSpeed',
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

      const expectedResult = photoRequestFixture;
      const actualResult = await validPhoto.save();

      expect(actualResult).toBeTruthy();
      expect(actualResult._id.toString()).toEqual(expectedResult._id.toString());
      expect(actualResult.aspectRatio).toEqual(expectedResult.aspectRatio);
      expect(actualResult.caption).toEqual(expectedResult.caption);
      expect(actualResult.captureDate).toEqual(new Date(expectedResult.captureDate));
      expect(actualResult.equipment.camera).toEqual(expectedResult.equipment.camera);
      expect(actualResult.equipment.lens).toEqual(expectedResult.equipment.lens);
      expect(actualResult.location).toEqual(expectedResult.location);
      expect(actualResult.settings.aperture).toEqual(expectedResult.settings.aperture);
      expect(actualResult.settings.focalLength).toEqual(expectedResult.settings.focalLength);
      expect(actualResult.settings.iso).toEqual(expectedResult.settings.iso);
      expect(actualResult.settings.shutterSpeed).toEqual(expectedResult.settings.shutterSpeed);
      expect(actualResult.storeUrl).toEqual(expectedResult.storeUrl);
      expect(actualResult.tags.toString()).toEqual(expectedResult.tags.toString());
      expect(actualResult.title).toEqual(expectedResult.title);
    });
  });
});
