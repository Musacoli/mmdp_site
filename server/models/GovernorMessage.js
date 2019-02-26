import keystone from 'keystone';
import keystoneAdapter from 'keystone-storage-adapter-s3';
import S3Adapter from './S3';

const { Types } = keystone.Field;

const GovernorMessage = new keystone.List('GovernorMessage');

const governorPhotoStorage = new keystone.Storage({
  adapter: keystoneAdapter,
  s3: S3Adapter,
  schema: {
    bucket: true,
    etag: true,
    path: true,
    url: true,
  },
});

GovernorMessage.add({
  creator: { type: Types.Relationship, ref: 'User' },
  governorName: { type: String },
  governorPhoto: {
    type: Types.File,
    storage: governorPhotoStorage,
    mimetype: '.jpeg, .jpg, .gif, .svg',
    required: false,
    url: String,
  },
  governorMessage: {
    type: Types.Html,
    wysiwyg: true,
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

GovernorMessage.defaultColumns = 'governorName';
GovernorMessage.register();

export default GovernorMessage;
