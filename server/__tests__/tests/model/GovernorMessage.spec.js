import chai from 'chai';
import keystone from '../../helpers/commons';

const { expect } = chai;

describe('Governor Message Model', () => {
  it('expect to have schema defined', (done) => {
    const GovernorMessage = keystone.list('GovernorMessage');

    expect(GovernorMessage.fields)
      .to.have.property('creator')
      .be.an('Object');
    expect(GovernorMessage.fields)
      .to.have.property('governorName')
      .be.an('Object');
    expect(GovernorMessage.fields)
      .to.have.property('governorPhoto')
      .be.an('Object');
    expect(GovernorMessage.fields)
      .to.have.property('governorMessage')
      .be.an('Object');
    expect(GovernorMessage.fields)
      .to.have.property('archived')
      .be.an('Object');
    expect(GovernorMessage.fields)
      .to.have.property('createdAt')
      .be.an('Object');
    expect(GovernorMessage.fields)
      .to.have.property('updatedAt')
      .be.an('Object');

    done();
  });
});
