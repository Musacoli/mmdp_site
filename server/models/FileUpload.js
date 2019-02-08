import keystone from 'keystone';
import keystoneAdapter from 'keystone-storage-adapter-s3';
import S3Adapter from './S3';

const { Types } = keystone.Field;

const FileUpload = new keystone.List('FileUpload');

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

FileUpload.add({
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

FileUpload.defaultColumns = 'file';
FileUpload.register();

export default FileUpload;
