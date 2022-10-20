import tagMaxLengthFixture from '@/tests/fixtures/tags/negative/tagMaxLength.fixture';
import tagMinLengthFixture from '@/tests/fixtures/tags/negative/tagMinLength.fixture';
import tagTrimFixture from '@/tests/fixtures/tags/negative/tagTrim.fixture';
import tagRequestFixture from '@/tests/fixtures/tags/tagRequest.fixture';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

import TagModel from './Tag.model';

describe('Tag Model', () => {
  beforeAll(async () => mongoMemoryServer.connectDB());
  afterAll(async () => mongoMemoryServer.disconnectDB());

  describe('Validation', () => {
    test('Expect to validate required for the relevant properties in TagModel', async () => {
      const invalidTag = new TagModel({});

      try {
        await invalidTag.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Tag validation failed');

        expect(errors.tag.properties.message).toEqual('Path `tag` is required.');
      }
    });

    test('Expect to validate minLength for the relevant properties in TagModel', async () => {
      const invalidTag = new TagModel(tagMinLengthFixture);

      try {
        await invalidTag.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Tag validation failed');

        expect(errors.tag.properties.message).toEqual(
          'Path `tag` (`1`) is shorter than the minimum allowed length (2).',
        );
      }
    });

    test('Expect to validate maxLength for the relevant properties in TagModel', async () => {
      const invalidTag = new TagModel(tagMaxLengthFixture);

      try {
        await invalidTag.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Tag validation failed');

        expect(errors.tag.properties.message).toEqual(
          `Path \`tag\` (\`${utilFixture.chars51}\`) is longer than the maximum allowed length (50).`,
        );
      }
    });

    test('Expect to validate and trim the relevant properties in TagModel', async () => {
      const invalidTag = new TagModel(tagTrimFixture);

      try {
        await invalidTag.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Tag validation failed');

        expect(errors.tag.properties.message).toEqual('Path `tag` is required.');
      }
    });

    test('Expect no validation errors for a valid TagModel', async () => {
      const validTag = new TagModel(tagRequestFixture);

      const savedValidTag = await validTag.save();

      const { _id: expectedId, tag: expectedTag, photos: expectedPhotos } = tagRequestFixture;
      const { _id: actualId, tag: actualTag, photos: actualPhotos } = savedValidTag;

      expect(savedValidTag).toBeTruthy();
      expect(actualId.toString()).toEqual(expectedId.toString());

      expect(actualTag).toEqual(expectedTag);
      expect(actualPhotos.toString()).toEqual(expectedPhotos.toString());
    });
  });
});
