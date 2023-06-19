import * as photosDbService from '@/services/photosDb.service';
import * as tagsDbService from '@/services/tagsDb.service';
import * as usersDbService from '@/services/usersDb.service';
import * as typ from '@/types/types/db.types';

import photoIdFixture from '../fixtures/photos/photoId.fixture';
import photoImageRequestFixture from '../fixtures/photos/photoImageRequest.fixture';
import photosIdsFixture from '../fixtures/photos/photosIds.fixture';
import photosImageRequestFixture from '../fixtures/photos/photosImageRequest.fixture';
import photosTagIdsFixture from '../fixtures/photos/photosTagIds.fixture';
import photoTagIdsFixture from '../fixtures/photos/photoTagIds.fixture';
import photoUserIdFixture from '../fixtures/photos/photoUserId.fixture';
import tagsRequestFixture from '../fixtures/tags/tagsRequest.fixture';
import userAdminRequestFixture from '../fixtures/users/userAdminRequest.fixture';
import usersRequestFixture from '../fixtures/users/usersRequest.fixture';

/* 
 $ photosScripts
  - prepPhotoData
  - prepPhotosData
  - prepTagsAndUserData
*/

export const prepPhotoData = async (): Promise<void> => {
  await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));
  await usersDbService.addUser(userAdminRequestFixture as any).catch((error): void => console.log(error));
  await photosDbService.addPhoto(photoImageRequestFixture as any).catch((error): void => console.log(error));
  await tagsDbService
    .addTagPhotos(photoTagIdsFixture, photoIdFixture)
    .catch((error): void => console.log(error));
  await usersDbService
    .addUserPhoto(photoUserIdFixture, photoIdFixture)
    .catch((error): void => console.log(error));
};

export const prepPhotosData = async (): Promise<void> => {
  await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));
  await usersDbService.addUsers(usersRequestFixture as any).catch((error): void => console.log(error));
  await photosDbService
    .addPhotos(photosImageRequestFixture as any)
    .catch((error): void => console.log(error));

  photosIdsFixture.forEach(
    async (photoId, index): Promise<typ.QueryStatus | void> =>
      tagsDbService
        .addTagPhotos(photosTagIdsFixture[index], photoId)
        .catch((error): void => console.log(error)),
  );
  photosIdsFixture.forEach(
    async (photoId): Promise<typ.QueryStatus | void> =>
      usersDbService.addUserPhoto(photoUserIdFixture, photoId).catch((error): void => console.log(error)),
  );
};

export const prepTagsAndUserData = async (): Promise<void> => {
  await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));
  await usersDbService.addUser(userAdminRequestFixture as any).catch((error): void => console.log(error));
};
