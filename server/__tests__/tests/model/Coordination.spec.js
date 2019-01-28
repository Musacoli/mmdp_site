import chai from 'chai';
import keystone from '../../helpers/commons';

const { expect } = chai;


describe('Coordination Model', () => {
  it('expect to have schema defined', (done) => {
    const Coordination = keystone.list('Coordination');

    expect(Coordination.fields).to.have.property('creator').be.an('Object');
    expect(Coordination.fields).to.have.property('coordination').be.an('Object');
    expect(Coordination.fields).to.have.property('whatAreWeDoing').be.an('Object');
    expect(Coordination.fields).to.have.property('introToHighlights').be.an('Object');
    expect(Coordination.fields).to.have.property('highlight').be.an('Object');
    expect(Coordination.fields).to.have.property('createdAt').be.an('Object');
    expect(Coordination.fields).to.have.property('updatedAt').be.an('Object');
    expect(Coordination.fields).to.have.property('archived').be.an('Object');

    done();
  });
});
