"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _keystone = _interopRequireDefault(require("keystone"));

var _routes = _interopRequireDefault(require("./routes"));

_dotenv.default.config();

var MONGODB_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URL : process.env.MONGODB_URL;

_keystone.default.init({
  name: 'MMDP CMS',
  brand: 'MMDP CMS',
  sass: './public',
  static: './public',
  updates: './updates',
  'auto update': true,
  session: true,
  auth: true,
  mongo: MONGODB_URL,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET
}); // Import models


_keystone.default.import('./models'); // Setup common locals for bundled templates and layouts.


_keystone.default.set('locals', {
  env: _keystone.default.get('env')
});

_keystone.default.set('routes', _routes.default);

_keystone.default.start();

var _default = _keystone.default;
exports.default = _default;