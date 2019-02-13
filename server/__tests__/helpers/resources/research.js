import keystone from 'keystone';
import faker from 'faker';

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

export const createResearch = async () => {
  return keystone.list('Research').model.create(data);
};
