"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../index"));

var port = process.env.TEST_PORT || 5150;

_index.default.set('port', port);

var _default = _index.default;
exports.default = _default;