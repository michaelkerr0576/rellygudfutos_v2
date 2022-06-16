import mongoMemoryServer from '@/tests/mongoMemoryServer';

import PhotoModel from './Photo.model';

beforeAll(async () => mongoMemoryServer.connectDB());
afterAll(async () => mongoMemoryServer.disconnectDB);

describe('Photo Model', () => {
  describe('Required Validation', () => {
    test('Expect to validate required for each property in PhotoModel', async () => {
      const photo = new PhotoModel({}) as any;

      try {
        await photo.save();
      } catch (error: any) {
        const { name, _message: message, errors } = error;

        expect(name).toEqual('ValidationError');
        expect(message).toEqual('Photo validation failed');

        // expect(errors['details.captureDate'].properties.message).toEqual(
        //   'Capture date required',
        // );
        expect(errors['details.captureLocation'].properties.message).toEqual(
          'Capture location required',
        );
        expect(errors['details.imageCaption'].properties.message).toEqual(
          'Image caption required',
        );
        // expect(errors['details.imageFile'].properties.message).toEqual(
        //   'Image file required',
        // );
        // expect(errors['details.imageSize'].properties.message).toEqual(
        //   'Image size required',
        // );
        // expect(errors['details.imageTags'].properties.message).toEqual(
        //   'Image tags required',
        // );
        expect(errors['details.imageTitle'].properties.message).toEqual(
          'Image title required',
        );
        expect(errors['details.originalImageName'].properties.message).toEqual(
          'Original image name required',
        );
        expect(errors['details.storeLink'].properties.message).toEqual(
          'Store link required',
        );
        expect(errors['equipment.cameraIso'].properties.message).toEqual(
          'Camera iso required',
        );
        expect(errors['equipment.cameraName'].properties.message).toEqual(
          'Camera name required',
        );
        expect(errors['equipment.lensAperture'].properties.message).toEqual(
          'Lens aperture required',
        );
        expect(errors['equipment.lensFocalLength'].properties.message).toEqual(
          'Lens focal length required',
        );
        expect(errors['equipment.lensName'].properties.message).toEqual(
          'Lens name required',
        );
        expect(errors['equipment.lensShutterSpeed'].properties.message).toEqual(
          'Lens shutter speed required',
        );
      }
    });
  });
});
