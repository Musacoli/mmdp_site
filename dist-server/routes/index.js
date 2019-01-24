"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _keystone = _interopRequireDefault(require("keystone"));

var _expressValidation = _interopRequireDefault(require("express-validation"));

var _apiResponse = _interopRequireDefault(require("../middleware/apiResponse"));

var _validator = _interopRequireDefault(require("../validation/validator"));

var _errorHandler = _interopRequireDefault(require("../middleware/errorHandler"));

var importRoutes = _keystone.default.importer(__dirname);

function _default(app) {
  var routes = {
    api: importRoutes('./api')
  };
  app.use('/api/v1/auth/login', [_apiResponse.default, (0, _expressValidation.default)(_validator.default.login)], routes.api.auth.index.login);
  app.get('/', function (req, res) {
    res.json({
      message: 'API endpoint for mmdp cms'
    });
  });
  app.use(_errorHandler.default);
}