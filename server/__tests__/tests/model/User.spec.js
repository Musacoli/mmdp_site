import keystone from '../../helpers/commons';

describe('Users', () => {
  it('should be a connection to Mongo', (done) => {
    keystone.mongoose.connection.db.should.be.a('Object');
    done();
  });

  it('should be a Mongoose Model', (done) => {
    const User = keystone.list('User');

    User.should.be.a('Object');
    User.should.have.property('model').be.a('Function');
    User.should.have.property('schema').be.a('Object');

    done();
  });
});
