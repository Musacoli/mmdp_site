"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressValidation = require("express-validation");

var _responseMessage = _interopRequireDefault(require("../constants/responseMessage"));

var errorHandler = function errorHandler(err, req, res, next) {
  if (err) {
    if (err instanceof _expressValidation.ValidationError) {
      var _error = err.errors.reduce(function (errors, errorItem) {
        var errorMessages = errors;
        var field = errorItem.field,
            messages = errorItem.messages; // match field name to first error message and store in object

        errorMessages[field[0]] = messages[0].replace(/["]/g, '');
        return errorMessages;
      }, {});

      return res.sendError('Validation error', 400, _error);
    }

    var error = err.message || undefined;
    return res.sendError(_responseMessage.default.INTERNAL_SERVER_ERROR, 500, error);
  }

  return next();
};

var _default = errorHandler;
exports.default = _default;