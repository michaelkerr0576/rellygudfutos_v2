import postUserEnumFixture from '@/tests/fixtures/users/negative/postUserEnum.fixture';
import postUserMaxLengthFixture from '@/tests/fixtures/users/negative/postUserMaxLength.fixture';
import postUserRegexFixture from '@/tests/fixtures/users/negative/postUserRegex.fixture';
import postUserTrimFixture from '@/tests/fixtures/users/negative/postUserTrim.fixture';
import postUserFixture from '@/tests/fixtures/users/postUser.fixture';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

import UserModel from './User.model';

describe('User Model', () => {
  beforeAll(async () => mongoMemoryServer.connectDB());
  afterAll(async () => mongoMemoryServer.disconnectDB());

  describe('Validation', () => {
    test('Expect to validate required for the relevant properties in UserModel', async () => {
      const invalidUser = new UserModel({});

      try {
        await invalidUser.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('User validation failed');

        expect(errors.email.properties.message).toEqual('Path `email` is required.');
        expect(errors.name.properties.message).toEqual('Path `name` is required.');
        expect(errors.password.properties.message).toEqual('Path `password` is required.');
      }
    });

    test('Expect to validate maxLength for the relevant properties in UserModel', async () => {
      const invalidUser = new UserModel(postUserMaxLengthFixture);

      try {
        await invalidUser.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('User validation failed');

        expect(errors.email.properties.message).toEqual(
          `Path \`email\` (\`${utilFixture.chars101}\`) is longer than the maximum allowed length (100).`,
        );
        expect(errors.name.properties.message).toEqual(
          `Path \`name\` (\`${utilFixture.chars101}\`) is longer than the maximum allowed length (100).`,
        );
        expect(errors.password.properties.message).toEqual(
          `Path \`password\` (\`${utilFixture.chars101}\`) is longer than the maximum allowed length (100).`,
        );
      }
    });

    test('Expect to validate enum for the relevant properties in UserModel', async () => {
      const invalidPhoto = new UserModel(postUserEnumFixture);

      try {
        await invalidPhoto.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('User validation failed');

        expect(errors.role.properties.message).toEqual(
          '`ULTIMATE` is not a valid enum value for path `role`.',
        );
      }
    });

    test('Expect to validate regex for the relevant properties in UserModel', async () => {
      const invalidUser = new UserModel(postUserRegexFixture);

      try {
        await invalidUser.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('User validation failed');

        expect(errors.email.properties.message).toEqual('Path `email` is invalid (testemail).');
        expect(errors.name.properties.message).toEqual('Path `name` is invalid (&^% 123).');
      }
    });

    test('Expect to validate and trim the relevant properties in UserModel', async () => {
      const invalidUser = new UserModel(postUserTrimFixture);

      try {
        await invalidUser.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('User validation failed');

        expect(errors.email.properties.message).toEqual('Path `email` is required.');
        expect(errors.name.properties.message).toEqual('Path `name` is invalid (1).');
      }
    });

    test('Expect no validation errors for a valid UserModel', async () => {
      const validUser = new UserModel(postUserFixture);

      const savedValidUser = await validUser.save();

      const { _id: expectedId, email: expectedEmail, password: expectedPassword } = postUserFixture;
      const { _id: actualId, email: actualEmail, password: actualPassword } = savedValidUser;

      expect(savedValidUser).toBeTruthy();
      expect(actualId.toString()).toEqual(expectedId.toString());

      expect(actualEmail).toEqual(expectedEmail.toLowerCase());
      expect(actualPassword).toEqual(expectedPassword);
    });
  });
});
