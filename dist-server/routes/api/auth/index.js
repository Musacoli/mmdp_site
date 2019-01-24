"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.user = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _keystone = _interopRequireDefault(require("keystone"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _responseMessage = _interopRequireDefault(require("../../../constants/responseMessage"));

var user = function user() {
  return _keystone.default.list('User');
};

exports.user = user;

var login =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, res) {
    var _req$body, email, username, password, query, userData, validPassword, payload, token, data, error;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password;
            query = email ? {
              email: email
            } : {
              username: username
            };
            _context.prev = 2;
            _context.next = 5;
            return user().model.findOne(query);

          case 5:
            userData = _context.sent;

            if (userData) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.sendError(_responseMessage.default.INVALID_CREDENTIALS, 401));

          case 8:
            if (userData.confirmed) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.sendError(_responseMessage.default.UNCOMPLETED_ACCOUNT, 403));

          case 10:
            _context.next = 12;
            return _bcrypt.default.compare(password, userData.password);

          case 12:
            validPassword = _context.sent;

            if (validPassword) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.sendError(_responseMessage.default.INVALID_CREDENTIALS, 401));

          case 15:
            payload = {
              // eslint-disable-next-line no-underscore-dangle
              id: userData._id,
              username: userData.username,
              email: userData.email,
              groups: userData.groups
            };
            token = _jsonwebtoken.default.sign(payload, process.env.JWTSECRET);
            data = {
              user: (0, _objectSpread2.default)({}, payload, {
                token: token
              })
            };
            return _context.abrupt("return", res.sendSuccess(data));

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](2);
            error = _context.t0.message || '';
            return _context.abrupt("return", res.sendError(_responseMessage.default.INTERNAL_SERVER_ERROR, 500, error));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 21]]);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;