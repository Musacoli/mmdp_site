import keystone from 'keystone';

const S3AdapterConfig = {
  key: process.env.S3_KEY,
  secret: process.env.S3_SECRET,
  bucket: process.env.S3_BUCKET,
  region: process.env.S3_REGION,
  path: keystone.expandPath('/assets/images'),
  generateFilename(file) {
    return Date.now() + file.originalname;
  },
  uploadParams: {
    ACL: 'public-read',
  },
};

export default S3AdapterConfig;
