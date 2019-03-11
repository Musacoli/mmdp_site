import keystone from 'keystone';
import keystoneAdapter from 'keystone-storage-adapter-s3';
import S3AdapterConfig from './S3';

const { Types } = keystone.Field;

const Event = new keystone.List('Event', {
  autokey: { path: 'slug', from: 'title', unique: true },
  map: { name: 'title' },
});

const EventsStorage = new keystone.Storage({
  adapter: keystoneAdapter,
  s3: S3AdapterConfig,
  schema: {
    bucket: true,
    etag: true,
    path: true,
    url: true,
  },
});

Event.add({
  title: { type: Types.Text, required: true, intial: true },
  dateCreated: { type: Types.Date, default: Date.now },
  eventDate: { type: Types.Date },
  author: { type: Types.Relationship, ref: 'User' },
  mainEvent: { type: Boolean, default: false },
  headerImage: {
    type: Types.File,
    storage: EventsStorage,
    mimetype: '.jpeg, .jpg, .gif, .svg',
    required: false,
    url: String,
  },
  details: { type: Types.Html, wysiwyg: true },
  archived: { type: Boolean, default: false },
});

Event.register();

export default Event;
