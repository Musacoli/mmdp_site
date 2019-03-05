import keystone from 'keystone';
import keystoneAdapter from 'keystone-storage-adapter-s3';
import S3Adapter from './S3';

const { Types } = keystone.Field;

const About = new keystone.List('About');
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
About.add({
  creator: { type: Types.Relationship, ref: 'User' },
  about: { type: Types.Html, wysiwyg: true },
  background: { type: Types.Html, wysiwyg: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  archived: { type: Boolean, default: false },
  image1: {
    type: Types.File,
    storage,
  },
  image2: {
    type: Types.File,
    storage,
  },
});

About.defaultColumns = 'about, background';
About.register();

export default About;
