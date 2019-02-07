import chai from 'chai';
import keystone from '../../helpers/commons';

const { expect } = chai;

describe('Objectives Model', () => {
  it('expect to have schema defined', (done) => {
    const Objectives = keystone.list('Objectives');

    expect(Objectives.fields)
      .to.have.property('creator')
      .be.an('Object');
    expect(Objectives.fields)
      .to.have.property('Objectives')
      .be.an('Object');
    expect(Objectives.fields)
      .to.have.property('createdAt')
      .be.an('Object');
    expect(Objectives.fields)
      .to.have.property('updatedAt')
      .be.an('Object');
    expect(Objectives.fields)
      .to.have.property('archived')
      .be.an('Object');

    done();
  });
});
