import chai from 'chai';
import keystone from '../../helpers/commons';

const { expect } = chai;

describe('Edo State Approach Model', () => {
  it('expect to have schema defined', (done) => {
    const EdoStateApproach = keystone.list('EdoStateApproach');

    expect(EdoStateApproach.fields)
      .to.have.property('creator')
      .be.an('Object');
    expect(EdoStateApproach.fields)
      .to.have.property('theEdoStateApproach')
      .be.an('Object');
    expect(EdoStateApproach.fields)
      .to.have.property('background')
      .be.an('Object');
    expect(EdoStateApproach.fields)
      .to.have.property('createdAt')
      .be.an('Object');
    expect(EdoStateApproach.fields)
      .to.have.property('updatedAt')
      .be.an('Object');
    expect(EdoStateApproach.fields)
      .to.have.property('archived')
      .be.an('Object');

    done();
  });
});
