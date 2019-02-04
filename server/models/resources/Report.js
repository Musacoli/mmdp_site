import keystone from 'keystone';
import keystoneS3Adapter from 'keystone-storage-adapter-s3';
import S3Config from '../S3';

const { Types } = keystone.Field;
const Report = new keystone.List('Report');
S3Config.path = keystone.expandPath('/assets/documents');

const reportStorage = new keystone.Storage({
  adapter: keystoneS3Adapter,
  s3: S3Config,
  schema: {
    bucket: true,
    etag: true,
    path: true,
    url: true,
  },
});

Report.add({
  title: { type: Types.Text, required: true, initial: true },
  reportFile: {
    type: Types.File,
    storage: reportStorage,
    mimetype: '.pdf',
    initial: true,
    required: true,
  },
  reportType: { type: Types.Select, options: ['quarterly', 'annual'] },
});

Report.register();

export default Report;
