import tagsDbService from '@/services/tagsDb.service';

import tagRequestFixture from '../fixtures/tags/tagRequest.fixture';
import tagsRequestFixture from '../fixtures/tags/tagsRequest.fixture';

const prepTagData = async (): Promise<void> => {
  await tagsDbService.addTag(tagRequestFixture as any).catch((error): void => console.log(error));
};

const prepTagsData = async (): Promise<void> => {
  await tagsDbService.addTags(tagsRequestFixture as any).catch((error): void => console.log(error));
};

export default {
  prepTagData,
  prepTagsData,
};
