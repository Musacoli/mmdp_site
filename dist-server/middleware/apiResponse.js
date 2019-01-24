"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _status = _interopRequireDefault(require("../constants/status"));

var apiResponse = function apiResponse(req, res, next) {
  res.sendSuccess = function (data) {
    var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    var message = arguments.length > 2 ? arguments[2] : undefined;

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return res.status(statusCode).json({
      status: _status.default.SUCCESS,
      message: message,
      data: data
    });
  };

  res.sendError = function (message) {
    var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var error = arguments.length > 2 ? arguments[2] : undefined;

    if (req.method === 'OPTIONS') {
      return res.status(statusCode).end();
    }

    var statusText = statusCode >= 400 && statusCode < 500 ? _status.default.FAIL : _status.default.ERROR;
    return res.status(statusCode).json({
      status: statusText,
      message: message,
      error: error
    });
  };

  next();
};

var _default = apiResponse;
exports.default = _default;