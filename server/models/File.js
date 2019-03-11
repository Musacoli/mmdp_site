import keystone from 'keystone';
import keystoneAdapter from 'keystone-storage-adapter-s3';
import S3Adapter from './S3';

const { Types } = keystone.Field;

const File = new keystone.List('File');

const fileStorage = new keystone.Storage({
  adapter: keystoneAdapter,
  s3: S3Adapter,
  schema: {
    bucket: true,
    etag: true,
    path: true,
    url: true,
  },
});

File.add({
  file: {
    type: Types.File,
    storage: fileStorage,
    mimetype: '.jpeg, .jpg, .gif, .svg',
    required: false,
    url: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

File.defaultColumns = 'file';
File.register();

export default File;
