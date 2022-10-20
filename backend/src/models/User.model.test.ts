import userEnumFixture from '@/tests/fixtures/users/negative/userEnum.fixture';
import userMaxLengthFixture from '@/tests/fixtures/users/negative/userMaxLength.fixture';
import userRegexFixture from '@/tests/fixtures/users/negative/userRegex.fixture';
import userTrimFixture from '@/tests/fixtures/users/negative/userTrim.fixture';
import userRequestFixture from '@/tests/fixtures/users/userRequest.fixture';
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
      const invalidUser = new UserModel(userMaxLengthFixture);

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
      const invalidPhoto = new UserModel(userEnumFixture);

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
      const invalidUser = new UserModel(userRegexFixture);

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
      const invalidUser = new UserModel(userTrimFixture);

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
      const validUser = new UserModel(userRequestFixture);

      const savedValidUser = await validUser.save();

      const { _id: expectedId, email: expectedEmail, password: expectedPassword } = userRequestFixture;
      const { _id: actualId, email: actualEmail, password: actualPassword } = savedValidUser;

      expect(savedValidUser).toBeTruthy();
      expect(actualId.toString()).toEqual(expectedId.toString());

      expect(actualEmail).toEqual(expectedEmail.toLowerCase());
      expect(actualPassword).toEqual(expectedPassword);
    });
  });
});
