"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _keystone = _interopRequireDefault(require("keystone"));

var Types = _keystone.default.Field.Types;
var User = new _keystone.default.List('User');
User.add({
  username: {
    type: Types.Text,
    initial: true,
    required: true,
    index: true
  },
  email: {
    type: Types.Email,
    required: true,
    index: true,
    initial: true,
    unique: true
  },
  password: {
    type: Types.Password,
    required: true,
    initial: true
  },
  confirmed: {
    type: Boolean,
    index: true
  }
}, 'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Can access Keystone',
    index: true
  }
});
User.register();