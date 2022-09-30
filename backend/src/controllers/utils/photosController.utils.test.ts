// import { Response } from 'express';
// eslint-disable-next-line node/no-unpublished-import
import timekeeper from 'timekeeper';

// import { postPhotoFixture } from '@/tests/fixtures/photos';
import utilFixture from '@/tests/fixtures/util.fixture';
import mongoMemoryServer from '@/tests/mongoMemoryServer';

// import photosControllerUtils from './photosController.utils';

// const mockResponseStatus = jest.fn();
// const mockResponseJson = jest.fn();

// const mockResponse: Partial<Response> = {
//   status: mockResponseStatus.mockReturnThis(),
//   json: mockResponseJson,
// };

// const mockError = jest.fn();

// const mockError: Error = mockError;

describe('Photos Controller Utils', () => {
  beforeAll(async () => {
    await mongoMemoryServer.connectDB();
    timekeeper.freeze(utilFixture.freezeDate);
  });
  afterEach(async () => {
    await mongoMemoryServer.clearDB();
    jest.clearAllMocks();
  });
  afterAll(async () => {
    await mongoMemoryServer.disconnectDB();
    timekeeper.reset();
  });

  // TODO - add tests for hard to reach handlers
  // * Tests for hard to reach handlers - Test from Controller if it can be done

  // error: Error,
  // photoId: Types.ObjectId,
  // photoTagIds: Types.ObjectId[] | undefined,

  describe('Handle Cancel Add Photo', () => {
    test('Expect', async () => {
      // * Controller Utils: handle added photo
      // await photosControllerUtils.handleCancelAddPhoto(mockError, 123, [123]);
    });
  });
});
