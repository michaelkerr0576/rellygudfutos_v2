import userEnumFixture from '@/tests/fixtures/users/negative/userEnum.fixture';
import userMaxLengthFixture from '@/tests/fixtures/users/negative/userMaxLength.fixture';
import userRegexFixture from '@/tests/fixtures/users/negative/userRegex.fixture';
import userTrimFixture from '@/tests/fixtures/users/negative/userTrim.fixture';
import userRequestFixture from '@/tests/fixtures/users/userRequest.fixture';
import * as utilFixture from '@/tests/fixtures/util.fixture';
import * as mongoMemoryServer from '@/tests/mongoMemoryServer';

import UserModel from '../User.model';

describe('User Model', () => {
  beforeAll(async () => mongoMemoryServer.connectDB());
  afterAll(async () => mongoMemoryServer.disconnectDB());

  describe('Validation', () => {
    test('Expect to validate required for the relevant properties in UserModel', async () => {
      const invalidUser = new UserModel({});

      const expectedRequiredPaths = ['email', 'equipment.cameras', 'equipment.lenses', 'name', 'password'];

      try {
        await invalidUser.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('User validation failed');

        expectedRequiredPaths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(`Path \`${path}\` is required.`);
        });
      }
    });

    test('Expect to validate maxLength for the relevant properties in UserModel', async () => {
      const invalidUser = new UserModel(userMaxLengthFixture);

      const expectedMaxLength101Paths = [
        'email',
        'equipment.cameras',
        'equipment.lenses',
        'name',
        'password',
      ];

      try {
        await invalidUser.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('User validation failed');

        expectedMaxLength101Paths.forEach((path) => {
          expect(errors[path].properties.message).toEqual(
            `Path \`${path}\` (\`${utilFixture.chars101}\`) is longer than the maximum allowed length (100).`,
          );
        });
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

      const expectedResult = userRequestFixture;
      const actualResult = await validUser.save();

      expect(actualResult).toBeTruthy();
      expect(actualResult._id.toString()).toEqual(expectedResult._id.toString());
      expect(actualResult.email).toEqual(expectedResult.email.toLowerCase());
      expect(actualResult.password).toEqual(expectedResult.password);
    });
  });
});
