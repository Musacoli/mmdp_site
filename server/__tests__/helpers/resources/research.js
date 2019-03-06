import { faker, removeAllCollections } from '../commons/base';
import Research from '../../../models/resources/Research';

export const data = {
  title: 'My New Title',
  researchFile: {
    mimetype: 'application/pdf',
    filename: faker.system.fileName('.pdf'),
    path: '/assets/documents',
    size: faker.random.number(),
    etag: faker.random.uuid(),
    bucket: faker.lorem.word(),
    url: faker.internet.url(),
  },
};

export const createResearch = (overrides = {}) => {
  return Research.model.create({ ...data, ...overrides });
};

export const removeAllResearch = async () => {
  await removeAllCollections(Research);
};
