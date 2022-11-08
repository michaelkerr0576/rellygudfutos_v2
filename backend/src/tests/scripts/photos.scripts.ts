import photosDbService from '@/services/photosDb.service';
import tagsDbService from '@/services/tagsDb.service';
import usersDbService from '@/services/usersDb.service';
import * as typ from '@/ts/types/db.types';

import photoIdFixture from '../fixtures/photos/photoId.fixture';
import photoRequestFixture from '../fixtures/photos/photoRequest.fixture';
import photosIdsFixture from '../fixtures/photos/photosIds.fixture';
import photosRequestFixture from '../fixtures/photos/photosRequest.fixture';
import photosTagIdsFixture from '../fixtures/photos/photosTagIds.fixture';
import photoTagIdsFixture from '../fixtures/photos/photoTagIds.fixture';
import photoUserIdFixture from '../fixtures/photos/photoUserId.fixture';
import tagsRequestFixture from '../fixtures/tags/tagsRequest.fixture';
import userAdminRequestFixture from '../fixtures/users/userAdminRequest.fixture';
import usersRequestFixture from '../fixtures/users/usersRequest.fixture';

const prepPhotoData = async (): Promise<void> => {
  await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));
  await usersDbService.addUser(userAdminRequestFixture as any).catch((error): void => console.log(error));
  await photosDbService.addPhoto(photoRequestFixture as any).catch((error): void => console.log(error));
  await tagsDbService
    .addTagPhotos(photoTagIdsFixture, photoIdFixture)
    .catch((error): void => console.log(error));
  await usersDbService
    .addUserPhoto(photoUserIdFixture, photoIdFixture)
    .catch((error): void => console.log(error));
};

const prepPhotosData = async (): Promise<void> => {
  await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));
  await usersDbService.addUsers(usersRequestFixture as any).catch((error): void => console.log(error));
  await photosDbService.addPhotos(photosRequestFixture as any).catch((error): void => console.log(error));

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

const prepTagsAndUserData = async (): Promise<void> => {
  await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));
  await usersDbService.addUser(userAdminRequestFixture as any).catch((error): void => console.log(error));
};

export default {
  prepPhotoData,
  prepPhotosData,
  prepTagsAndUserData,
};
