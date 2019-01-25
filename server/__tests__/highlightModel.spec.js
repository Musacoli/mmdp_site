import chai from 'chai';
import keystone from './helpers/keystone';

const { expect } = chai;


describe('Highlight Model', () => {
  it('expect to have schema defined', (done) => {
    const Highlight = keystone.list('Highlight');

    expect(Highlight.fields).to.have.property('name').be.an('Object');

    done();
  });
});
