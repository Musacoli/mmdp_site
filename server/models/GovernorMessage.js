import keystone from 'keystone';

const Types = keystone.Field.Types;

const GovernorMessage = new keystone.List('GovernorMessage');

const governorPhotoStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
     // required; path where the files should be stored
    path: keystone.expandPath('upload/images'),
    generateFilename: function (file, index) {
      return Date.now() + file.originalname;
    },
    whenExists: 'error',
     // path where files will be served
    publicPath: '/upload/images',
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
  },
  governorMessage: { 
    type: Types.Html, 
    wysiwyg: true, 
  },
  archived: { type: Boolean, default: false },
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

