import chai from 'chai';
import helpers from '../../../utils/helpers';

const { expect } = chai;


describe('Helpers', () => {
  it('expect to validate helper functions', (done) => {
    const a = undefined;
    expect(helpers.isNullOrUndefined(a)).to.equal(true);
    expect(helpers.isString('')).to.equal(true);
    expect(helpers.isEmptyObject({})).to.equal(true);
    expect(helpers.isObject({})).to.equal(true);
    done();
  });
});
