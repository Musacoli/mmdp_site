"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _default = {
  login: {
    body: {
      email: _joi.default.when('username', {
        is: _joi.default.exist(),
        then: _joi.default.string().email(),
        otherwise: _joi.default.string().email().required()
      }),
      username: _joi.default.string().alphanum().min(3).max(30),
      password: _joi.default.string().required()
    }
  }
};
exports.default = _default;