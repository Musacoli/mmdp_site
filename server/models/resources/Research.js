import keystone from 'keystone';
import keystoneS3Adapter from 'keystone-storage-adapter-s3';
import S3Config from '../S3';

const { Types } = keystone.Field;
const Research = new keystone.List('Research');
S3Config.path = keystone.expandPath('/assets/documents');

const researchStorage = new keystone.Storage({
  adapter: keystoneS3Adapter,
  s3: S3Config,
  schema: {
    bucket: true,
    etag: true,
    path: true,
    url: true,
  },
});

Research.add({
  title: { type: Types.Text, required: true, initial: true },
  Archived: { type: Boolean, default: false },
  researchFile: {
    type: Types.File,
    storage: researchStorage,
    mimetype: '.pdf',
    initial: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Research.register();

export default Research;
