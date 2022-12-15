import * as tagsDbService from '@/services/tagsDb.service';

import tagRequestFixture from '../fixtures/tags/tagRequest.fixture';
import tagsRequestFixture from '../fixtures/tags/tagsRequest.fixture';

/* 
 $ tagsScripts
  - prepTagData
  - prepTagsData
*/

export const prepTagData = async (): Promise<void> => {
  await tagsDbService.addTag(tagRequestFixture as any).catch((error): void => console.log(error));
};

export const prepTagsData = async (): Promise<void> => {
  await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));
};
