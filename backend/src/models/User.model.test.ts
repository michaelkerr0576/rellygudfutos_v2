import {
  postUserFixture,
  postUserMaxLengthFixture,
  postUserRegexFixture,
  postUserTrimFixture,
} from '@/tests/fixtures/users';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

import UserModel from './User.model';

describe('User Model', () => {
  beforeAll(async () => mongoMemoryServer.connectDB());
  afterAll(async () => mongoMemoryServer.disconnectDB);

  describe('Validation', () => {
    test('Expect to validate required for the relevant properties in UserModel', async () => {
      const invalidUser = new UserModel({});

      try {
        await invalidUser.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('User validation failed');

        expect(errors.email.properties.message).toEqual(
          'Path `email` is required.',
        );
        expect(errors.password.properties.message).toEqual(
          'Path `password` is required.',
        );
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
        expect(errors.password.properties.message).toEqual(
          `Path \`password\` (\`${utilFixture.chars101}\`) is longer than the maximum allowed length (100).`,
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

        expect(errors.email.properties.message).toEqual(
          'Validator failed for path `email` with value `testEmail`',
        );
        expect(errors.password.properties.message).toEqual(
          'Validator failed for path `password` with value `34ddd`',
        );
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

        expect(errors.email.properties.message).toEqual(
          'Path `email` is required.',
        );
        expect(errors.password.properties.message).toEqual(
          'Validator failed for path `password` with value ` 1 `',
        );
      }
    });

    test('Expect no validation errors for a valid UserModel', async () => {
      const validUser = new UserModel(postUserFixture);

      const savedValidUser = await validUser.save();

      const {
        _id: expectedId,
        email: expectedEmail,
        password: expectedPassword,
      } = postUserFixture;
      const {
        _id: actualId,
        email: actualEmail,
        password: actualPassword,
      } = savedValidUser;

      expect(savedValidUser).toBeTruthy();
      expect(actualId.toString()).toEqual(expectedId.toString());

      expect(actualEmail).toEqual(expectedEmail);
      expect(actualPassword).toEqual(expectedPassword);
    });
  });
});
