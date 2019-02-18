import faker from 'faker';
import { removeAllModels } from '../commons/base';
import Media from '../../../models/resources/Media';

const makeMedia = (overrides = {}, times = 1) => {
  const mediaData = [];

  for (let i = 0; i < times; i++) {
    mediaData.push({
      mediaType: 'video',
      mediaFile: {
        mimetype: 'video/quicktime',
        filename: faker.system.fileName('.mov'),
        path: '/assets/media',
        size: faker.random.number(),
        etag: faker.random.uuid(),
        bucket: faker.lorem.word(),
        url: faker.internet.url(),
      },
      ...overrides,
    });
  }

  return times === 1 ? mediaData[0] : mediaData;
};

export const createMedia = async (overrides = {}, times = 1) => {
  const media = [];

  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    media.push(await Media.model.create(makeMedia(overrides)));
  }
  return times === 1 ? media[0] : media;
};

export const removeAllMedia = async () => {
  await removeAllModels(Media);
};
