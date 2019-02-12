import { faker, removeAllCollections } from '../commons/base';
import Document from '../../../models/resources/Document';

export const makeDocument = (overrides = {}, times = 1) => {
  const documentData = [];

  for (let i = 0; i < times; i++) {
    documentData.push({
      title: faker.lorem.word(),
      document: {
        mimetype: 'application/pdf',
        filename: 'ANRX_4xGlnWcpz82',
        path: '/assets/repository/media',
        size: 3028,
        etag: '4b41a3475132bd861b30a878e30aa56a',
        bucket: 'mmdp-img-assets',
        url:
          'https://s3.amazonaws.com/mmdp-img-assets/assets/repository/media/ANRX_4xGlnWcpz82',
      },
      ...overrides,
    });
  }

  return times === 1 ? documentData[0] : documentData;
};

export const createDocument = async (overrides = {}, times = 1) => {
  const documents = [];
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-await-in-loop
    documents.push(await Document.model.create(makeDocument(overrides)));
  }
  return times === 1 ? documents[0] : documents;
};

export const removeAllDocuments = async () => {
  await removeAllCollections(Document);
};
