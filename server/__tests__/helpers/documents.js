import {faker, removeAllModels} from './commons/base';
import Document from '../../models/resources/Document';

/**
 *
 *
 * @param overrides
 * @returns Object
 */
export const makeDocument = (overrides = {}) => {
  return {
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
  };
};

export const createDocument = async (overrides = {}) =>
  Document.model.create(makeDocument(overrides));

export const removeAllDocuments = async () => {
  await removeAllModels(Document);
};
