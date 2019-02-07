import chai from 'chai';
import keystone from '../../helpers/commons';

const { expect } = chai;

describe('Users', () => {
  it('should be a connection to Mongo', (done) => {
    expect(keystone.mongoose.connection.db).to.be.a('Object');
    done();
  });

  it('should be a Mongoose Model', (done) => {
    const User = keystone.list('User');

    expect(User).to.be.a('Object');
    expect(User)
      .to.have.property('model')
      .be.a('Function');
    expect(User)
      .to.have.property('schema')
      .be.a('Object');

    done();
  });
});
