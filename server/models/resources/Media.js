import keystone from 'keystone';
import keystoneS3Adapter from 'keystone-storage-adapter-s3';
import S3Config from '../S3';

const { Types } = keystone.Field;
const Media = new keystone.List('Media');
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

Media.add({
  mediaFile: {
    type: Types.File,
    storage: repositoryStorage,
    mimetype: '.pdf, .png, .jpg, .gif, .svg, .mp4, .mov, .flv',
    initial: true,
    required: true,
  },
  mediaType: { type: Types.Select, options: ['video', 'photo'] },
  created_at: { type: Date, required: true, default: Date.now },
});

Media.register();

export default Media;
