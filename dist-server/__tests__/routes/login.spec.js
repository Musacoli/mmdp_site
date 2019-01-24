"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _sinon = _interopRequireDefault(require("sinon"));

var _auth = require("../../routes/api/auth");

var _keystone = _interopRequireDefault(require("../helpers/keystone"));

var app = _keystone.default.app;
var route = '/api/v1/auth/login';
var expect = _chai.default.expect;
var completedAccount = {
  email: 'admin@mmdp.com',
  password: 'admin'
};
var unCompletedAccount = {
  email: 'user@mmdp.com',
  password: 'user'
};
var completedAccount2 = {
  username: 'admin',
  password: 'admin'
};
var invalidAccount = {
  username: 'swerfegr',
  password: 'sdfcsd'
};
describe('Auth route', function () {
  describe('POST /auth/login', function () {
    it('should return a 400 status when password is empty',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var res;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _supertest.default)(app).post(route).send({
                email: completedAccount.email,
                password: ''
              });

            case 2:
              res = _context.sent;
              expect(res.status).to.equal(400);
              expect(res.body).to.have.property('error').be.a('Object');
              expect(res.body.error).to.have.property('password');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should return a 401 status when a user tries to login with invalid credentials',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var res;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _supertest.default)(app).post(route).send(invalidAccount);

            case 2:
              res = _context2.sent;
              expect(res.status).to.equal(401);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should return a 403 status when a user with an uncompleted account tries to login',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var res;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _supertest.default)(app).post(route).send(unCompletedAccount);

            case 2:
              res = _context3.sent;
              expect(res.status).to.equal(403);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should return a 200 status when a user with a completed account tries to login with email',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4() {
      var res;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _supertest.default)(app).post(route).send(completedAccount);

            case 2:
              res = _context4.sent;
              expect(res.status).to.equal(200);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
    it('should return a 200 status when a user with a completed account tries to login with username',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5() {
      var res;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _supertest.default)(app).post(route).send(completedAccount2);

            case 2:
              res = _context5.sent;
              expect(res.status).to.equal(200);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
    it('should return a 500 if an error occurred while trying to login a user',
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6() {
      var stub, res;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              stub = _sinon.default.stub((0, _auth.user)().model, 'findOne').rejects();
              _context6.next = 3;
              return (0, _supertest.default)(app).post(route).send(completedAccount);

            case 3:
              res = _context6.sent;
              expect(res.status).to.equal(500);
              stub.restore();

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));
  });
});