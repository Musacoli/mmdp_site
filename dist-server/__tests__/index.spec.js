"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _keystone = _interopRequireDefault(require("./helpers/keystone"));

_chai.default.should();

var dbURI = process.env.TEST_MONGODB_URL;
describe('Users', function () {
  before(function (done) {
    if (_keystone.default.mongoose.connection.db) return done();

    _keystone.default.mongoose.connect(dbURI, done);
  });
  it('should be a connection to Mongo', function (done) {
    _keystone.default.mongoose.connection.db.should.be.a('Object');

    done();
  });
  it('should be a Mongoose Model', function (done) {
    var User = _keystone.default.list('User');

    User.should.be.a('Object');
    User.should.have.property('model').be.a('Function');
    User.should.have.property('schema').be.a('Object');
    done();
  });
});