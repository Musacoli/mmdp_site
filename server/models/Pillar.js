import keystone from 'keystone';
import keystoneAdapter from 'keystone-storage-adapter-s3';
import S3Adapter from './S3';

const { Types } = keystone.Field;

const Pillar = new keystone.List('Pillar');

const storage = new keystone.Storage({
  adapter: keystoneAdapter,
  s3: S3Adapter,

  schema: {
    bucket: true, // optional; store the bucket the file was uploaded to in your db
    etag: true, // optional; store the etag for the resource
    path: true, // optional; store the path of the file in your db
    url: true, // optional; generate & store a public URL
  },
});

Pillar.add({
  title: {
    type: Types.Html,
    wysiwyg: true,
    required: false,
  },
  introduction: {
    type: Types.Html,
    wysiwyg: true,
    required: false,
  },
  image1: {
    type: Types.File,
    storage,
  },
  image2: {
    type: Types.File,
    storage,
  },
  whatWeAreDoing: {
    type: Types.Html,
    wysiwyg: true,
    required: false,
  },
  keyActivities: {
    type: Types.Html,
    wysiwyg: true,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  pillarNumber: {
    type: Number,
  },
});

Pillar.defaultColumns = 'title';
Pillar.register();
export default Pillar;
