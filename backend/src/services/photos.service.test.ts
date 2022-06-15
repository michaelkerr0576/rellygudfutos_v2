// eslint-disable-next-line node/no-unpublished-import
// import mockingoose from 'mockingoose';

// import PhotoModel from '@/models/Photo.model';

import photosService from './photos.service';

describe('Photos service', () => {
  describe('getPhotos', () => {
    it('Expect to return an array of photos', async () => {
      // mockingoose(PhotoModel).toReturn(
      //   [
      //     {
      //       title: 'Book 1',
      //       author: {
      //         firstname: 'John',
      //         lastname: 'Doe',
      //       },
      //       year: 2021,
      //     },
      //     {
      //       title: 'Book 2',
      //       author: {
      //         firstname: 'Jane',
      //         lastname: 'Doe',
      //       },
      //       year: 2022,
      //     },
      //   ],
      //   'find',
      // );
      const results = await photosService.getPhotos();
      expect(results[0].details.imageTitle).toBe('Book 1');
    });
  });
});
