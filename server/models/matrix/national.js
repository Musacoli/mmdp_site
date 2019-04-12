import keystone from 'keystone';
import keystoneS3Adapter from 'keystone-storage-adapter-s3';
import S3Config from '../S3';

const { Types } = keystone.Field;
const CountryMap = new keystone.List('CountryMap');
S3Config.path = keystone.expandPath('/assets/documents');

const CountrySvgStorage = new keystone.Storage({
  adapter: keystoneS3Adapter,
  s3: S3Config,
  schema: {
    bucket: true,
    etag: true,
    path: true,
    url: true,
  },
});
CountryMap.add({
  createdAt: { type: Date, required: true, default: Date.now },
  countrySvgFile: {
    type: Types.File,
    storage: CountrySvgStorage,
    mimetype: '.svg',
    initial: true,
    required: true,
  },
  countryName: { type: String },
});

CountryMap.register();

export default CountryMap;
