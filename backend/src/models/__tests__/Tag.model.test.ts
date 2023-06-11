import tagMaxLengthFixture from '@/tests/fixtures/tags/negative/tagMaxLength.fixture';
import tagMinLengthFixture from '@/tests/fixtures/tags/negative/tagMinLength.fixture';
import tagTrimFixture from '@/tests/fixtures/tags/negative/tagTrim.fixture';
import tagRequestFixture from '@/tests/fixtures/tags/tagRequest.fixture';
import * as utilFixture from '@/tests/fixtures/util.fixture';
import * as mongoMemoryServer from '@/tests/mongoMemoryServer';

import TagModel from '../Tag.model';

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

      const expectedResult = tagRequestFixture;
      const actualResult = await validTag.save();

      expect(actualResult).toBeTruthy();
      expect(actualResult._id.toString()).toEqual(expectedResult._id.toString());
      expect(actualResult.tag).toEqual(expectedResult.tag);
      expect(actualResult.photos.toString()).toEqual(expectedResult.photos.toString());
    });
  });
});
