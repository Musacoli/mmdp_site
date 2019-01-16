import dotEnv from 'dotenv';
import keystone from 'keystone';
import routes from './routes';

dotEnv.config();

keystone.init({
  name: 'MMDP CMS',
  brand: 'MMDP CMS',
  sass: './public',
  static: './public',
  favicon: './public/favicon.ico',
  updates: './updates',
  'auto update': true,
  session: true,
  auth: true,
  mongo: process.env.MONGODB_URL || 'mongodb://127.0.0.1/mmdp-cms',
  'user model': 'User',
  'cookie secret': 'ATBNVERQR3443245343Q43543SEF9',
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
