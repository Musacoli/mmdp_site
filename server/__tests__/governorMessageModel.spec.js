import keystone from './helpers/keystone';
import chai from 'chai';

chai.should();

describe('Governor Message Model', function() {
 
  it('should have schema defined', function(done) {
    const GovernorMessage = keystone.list('GovernorMessage');

    GovernorMessage.fields.should.have.property('creator').be.a('Object');
    GovernorMessage.fields.should.have.property('governorName').be.a('Object');
    GovernorMessage.fields.should.have.property('governorPhoto').be.a('Object');
    GovernorMessage.fields.should.have.property('governorMessage').be.a('Object');
    GovernorMessage.fields.should.have.property('archived').be.a('Object');
    GovernorMessage.fields.should.have.property('createdAt').be.a('Object');
    GovernorMessage.fields.should.have.property('updatedAt').be.a('Object');
    
    done();
  }); 

});
