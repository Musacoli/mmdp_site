import helpers from '../helpers/helpers';
import chai from 'chai';
chai.should();

describe('Helpers', function() {

  it('should validate helper functions', function(done) {
    const a = undefined;
    helpers.isNullOrUndefined(a).should.equal(true)
    helpers.isString('').should.equal(true)
    helpers.isEmptyObject({}).should.equal(true)
    helpers.isObject({}).should.equal(true)
    done();
  }); 

});
