import keystone from './helpers/keystone';
import chai from 'chai';

chai.should();

 const dbURI = process.env.MONGODB_URL || "mongodb://localhost/mongodb://127.0.0.1/mmdp-cms";

describe('Users', function() {
  before(function(done){
    if (keystone.mongoose.connection.db) return done();
    keystone.mongoose.connect(dbURI, done);
  });

  it('should be a connection to Mongo', function(done){
    keystone.mongoose.connection.db.should.be.a('Object');
    done();
  });

  it('should be a Mongoose Model', function(done) {
    const User = keystone.list('User');

    User.should.be.a('Object');
    User.should.have.property('model').be.a('Function');
    User.should.have.property('schema').be.a('Object');

    done();
  });
});
