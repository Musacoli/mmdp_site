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
    const { MONGODB_URL } = process.env;
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

// keystone.start();
const socketio = require('socket.io');

keystone.start({
  onHttpServerCreated() {
    keystone.set('io', socketio.listen(keystone.httpServer));
  },
  onStart() {
    const io = keystone.get('io');
    const session = keystone.expressSession;

    // Share session between express and socketio
    io.use(function(socket, next) {
      session(socket.handshake, {}, next);
    });

    // Socketio connection
    io.on('connect', function(socket) {
      console.log('--- User connected');

      // Set session variables in route controller
      // which is going to load the client side socketio
      // in this case, ./routes/index.js
      console.log(socket.handshake.session);
      socket.emit('msg', socket.handshake.session.message);
      socket.emit('msg2', socket.handshake.session.new);

      socket.on('disconnect', function() {
        console.log('--- User disconnected');
      });
    });
  },
});

export default keystone;
