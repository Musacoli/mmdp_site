import chai from 'chai';
import supertest from 'supertest';
import keystone from './helpers/keystone';

chai.should();
const request = supertest(keystone.app);
const governorMessagePath = '/api/v1/about/governor-message';

const data = {
  governorName: 'mr governor',
  governorMessage: 'this is a message from the governor',
  id: '',
};


describe('Governor Message API', function() {

  before(function(done){
    const GovernorMessage = keystone.list('GovernorMessage');
    GovernorMessage.model.remove({}, done)
  });

  it('should create governor message', function(done) {
    request.post(`${governorMessagePath}/create`)
      .send(data)
      .end(function(err, res){
        const response = JSON.parse(res.text);
        data.id = response.item._id;
        response.item.should.have.property('governorName').be.a('string');
        response.item.should.have.property('governorMessage').be.a('string');
        response.item.should.have.property('createdAt').be.a('string');
        response.item.should.have.property('updatedAt').be.a('string');
        response.item.should.have.property('archived').be.a('boolean');
        response.item.should.have.property('archived').to.equal(false);
        done();
      })
  });

  it('should not create governor message with an invalid fields', function(done) {
    request.post(`${governorMessagePath}/create`)
      .send({governorMessage: 'message', governorName: 'n'})
      .end(function(err, res){
        const response = JSON.parse(res.text);
        response.should.have.property('errors').to.be.an('array');
        response.should.have.property('errors').to.be.an('array').that.does.include('Governor name must be two(2)  characters minimum');
        response.should.have.property('errors').to.be.an('array').that.does.include('Governor message must be twenty(20)  characters minimum');
        done();
      })
  });

  it('should not create governor message with an empty field', function(done) {
    request.post(`${governorMessagePath}/create`)
      .send({})
      .end(function(err, res){
        const response = JSON.parse(res.text);
        response.should.have.property('errors').to.be.an('array');
        response.should.have.property('errors').to.be.an('array').that.does.include('Governor name is required');
        response.should.have.property('errors').to.be.an('array').that.does.include('Governor message is required');
        done();
      })
  });

  it('should update governor message by id', function(done) {
    request.put(`${governorMessagePath}/${data.id}/update`)
      .send(data)
      .end(function(err, res){
        const response = JSON.parse(res.text);
        response.item.should.have.property('governorName').be.a('string');
        response.item.should.have.property('governorMessage').be.a('string');
        response.item.should.have.property('createdAt').be.a('string');
        response.item.should.have.property('updatedAt').be.a('string');
        response.item.should.have.property('archived').be.a('boolean');
        response.item.should.have.property('archived').to.equal(false);
        done();
      })
  });

  it('should not update governor message with an invalid id', function(done) {
    request.put(`${governorMessagePath}/899jkdhkj9790/update`)
      .send(data)
      .end(function(err, res){
        const response = JSON.parse(res.text);
        res.should.have.property('statusCode').to.equal(500);
        response.should.have.property('error').to.equal('database error');
        done();
      })
  });

  it('should get governor message by id', function(done) {
    request.get(`${governorMessagePath}/${data.id}`)
      .send()
      .end(function(err, res){
        const response = JSON.parse(res.text);
        response.item.should.have.property('governorName').be.a('string');
        response.item.should.have.property('governorMessage').be.a('string');
        response.item.should.have.property('createdAt').be.a('string');
        response.item.should.have.property('updatedAt').be.a('string');
        response.item.should.have.property('archived').be.a('boolean');
        response.item.should.have.property('archived').to.equal(false);
        done();
      })
  });

  it('should not retrieve governor message with an invalid id', function(done) {
    request.get(`${governorMessagePath}/76jkhdh868`)
      .send()
      .end(function(err, res){
        const response = JSON.parse(res.text);
        res.should.have.property('statusCode').to.equal(500);
        response.should.have.property('error').to.equal('database error');
        done();
      })
  });

  it('should retrieve the list governor messages', function(done) {
    request.get(`${governorMessagePath}/list`)
      .send()
      .end(function(err, res){
        const response = JSON.parse(res.text);
        response.items[0].should.have.property('governorName').be.a('string');
        response.items[0].should.have.property('governorMessage').be.a('string');
        response.items[0].should.have.property('createdAt').be.a('string');
        response.items[0].should.have.property('updatedAt').be.a('string');
        response.items[0].should.have.property('archived').be.a('boolean');
        response.items[0].should.have.property('archived').to.equal(false);
        done();
      })
  });

  it('should archive the governor messages by id', function(done) {
    request.delete(`${governorMessagePath}/${data.id}/remove`)
      .send()
      .end(function(err, res){
        const response = JSON.parse(res.text);
        response.item.should.have.property('governorName').be.a('string');
        response.item.should.have.property('governorMessage').be.a('string');
        response.item.should.have.property('createdAt').be.a('string');
        response.item.should.have.property('updatedAt').be.a('string');
        response.item.should.have.property('archived').be.a('boolean');
        response.item.should.have.property('archived').to.equal(true);
        done();
      })
  });

  it('should not archive the governor messages with an invalid id', function(done) {
    request.delete(`${governorMessagePath}/89787sjhkf98379/remove`)
      .send()
      .end(function(err, res){
        const response = JSON.parse(res.text);
        res.should.have.property('statusCode').to.equal(500);
        response.should.have.property('error').to.equal('database error');
        done();
      })
  });

});
