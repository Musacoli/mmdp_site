import keystone from 'keystone';

const S3AdapterConfig = {
  key: process.env.key || '$key',
  secret: process.env.secret || '$secret',
  bucket: process.env.S3_BUCKET,
  region: process.env.S3_REGION,
  publicUrl: `https://s3.amazonaws.com/${process.env.S3_BUCKET}`,
  path: keystone.expandPath('/assets/images'),
  uploadParams: {
    ACL: 'public-read',
  },
};

export default S3AdapterConfig;
