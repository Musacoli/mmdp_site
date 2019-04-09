import keystone from 'keystone';
import keystoneS3Adapter from 'keystone-storage-adapter-s3';
import S3Config from '../../S3';

const { Types } = keystone.Field;
const StateSVG = new keystone.List('StateSVG');
S3Config.path = keystone.expandPath('/assets/documents');

const StateSVGStorage = new keystone.Storage({
  adapter: keystoneS3Adapter,
  s3: S3Config,
  schema: {
    bucket: true,
    etag: true,
    path: true,
    url: true,
  },
});

StateSVG.add({
  createdAt: { type: Date, required: true, default: Date.now },
  StateSVGFile: {
    type: Types.File,
    storage: StateSVGStorage,
    mimetype: '.svg',
    initial: true,
    required: true,
    unique: true,
  },
});

StateSVG.register();

export default StateSVG;
