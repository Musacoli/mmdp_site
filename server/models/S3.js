import keystone from 'keystone';

const S3AdapterConfig = {
  key: process.env.S3_KEY,
  secret: process.env.S3_SECRET,
  bucket: process.env.S3_BUCKET,
  region: process.env.S3_REGION,
  publicUrl: `https://s3.amazonaws.com/${process.env.S3_BUCKET}`,
  path: keystone.expandPath('/assets/images'),
  uploadParams: {
    ACL: 'public-read',
  },
};

export default S3AdapterConfig;
