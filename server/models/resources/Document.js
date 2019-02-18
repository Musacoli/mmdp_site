import keystone from 'keystone';
import keystoneS3Adapter from 'keystone-storage-adapter-s3';
import S3Config from '../S3';

const { Types } = keystone.Field;
const Document = new keystone.List('Document');
S3Config.path = keystone.expandPath('/assets/repository/media');

const repositoryStorage = new keystone.Storage({
  adapter: keystoneS3Adapter,
  s3: S3Config,
  schema: {
    bucket: true,
    etag: true,
    path: true,
    url: true,
  },
});

Document.add({
  title: { type: Types.Text, required: true, initial: true },
  archived: { type: Types.Boolean, initial: false },
  document: {
    type: Types.File,
    storage: repositoryStorage,
    mimetype: '.pdf',
    initial: true,
    required: true,
  },
});

Document.register();

export default Document;
