
import dotEnv from 'dotenv';
import keystone from 'keystone';
import routes from './routes';

dotEnv.config();

const mongodbURL = () => {
  if (process.env.NODE_ENV === 'test') {
    const MONGODB_URL = process.env.TEST_MONGODB_URL;
    return MONGODB_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    const MONGODB_URL = process.env.MONGODB_URL;
    return MONGODB_URL;
  }
  if (process.env.NODE_ENV === 'development') {
    const MONGODB_URL = process.env.DEV_MONGODB_URL;
    return MONGODB_URL;
  }
};

keystone.init({
  name: 'MMDP CMS',
  brand: 'MMDP CMS',
  sass: './public',
  static: './public',
  updates: './updates',
  'auto update': true,
  session: true,
  auth: true,
  mongo: mongodbURL(),
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET,
});

// Import models
keystone.import('./models');

// Setup common locals for bundled templates and layouts.
keystone.set('locals', {
  env: keystone.get('env'),
});

keystone.set('routes', routes);

keystone.start();

export default keystone;
