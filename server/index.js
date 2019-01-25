
import dotEnv from 'dotenv';
import keystone from 'keystone';
import routes from './routes';

dotEnv.config();

const MONGODB_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URL : process.env.MONGODB_URL;

keystone.init({
  name: 'MMDP CMS',
  brand: 'MMDP CMS',
  sass: './public',
  static: './public',
  // favicon: './public/favicon.ico',
  // updates: './updates',
  // 'auto update': true,
  updates: './updates',
  'auto update': true,
  session: true,
  auth: true,
  mongo: MONGODB_URL,
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
