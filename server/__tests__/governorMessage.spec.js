import chai from 'chai';
import supertest from 'supertest';
import keystone from './helpers/keystone';

const { expect } = chai;

const request = supertest(keystone.app);
const governorMessagePath = '/api/v1/about/governor-message';

const data = {
  governorName: 'mr governor',
  governorMessage: 'this is a message from the governor',
  id: '',
};


describe('Governor Message API', () => {
  before((done) => {
    const GovernorMessage = keystone.list('GovernorMessage');
    GovernorMessage.model.remove({}, done);
  });

  it('expect to create governor message', (done) => {
    request.post(`${governorMessagePath}/create`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        data.id = response.item._id;
        expect(response.item).to.have.property('governorName').be.a('string');
        expect(response.item).to.have.property('governorMessage').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not create governor message with an invalid fields', (done) => {
    request.post(`${governorMessagePath}/create`)
      .send({ governorMessage: 'message', governorName: 'n' })
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Governor name must be two(2)  characters minimum');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Governor message must be twenty(20)  characters minimum');
        done();
      });
  });

  it('expect to not create governor message with an empty field', (done) => {
    request.post(`${governorMessagePath}/create`)
      .send({})
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Governor name is required');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Governor message is required');
        done();
      });
  });

  it('expect to update governor message by id', (done) => {
    request.put(`${governorMessagePath}/${data.id}/update`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('governorName').be.a('string');
        expect(response.item).to.have.property('governorMessage').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not update governor message with an invalid id', (done) => {
    request.put(`${governorMessagePath}/899jkdhkj9790/update`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to get governor message by id', (done) => {
    request.get(`${governorMessagePath}/${data.id}`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('governorName').be.a('string');
        expect(response.item).to.have.property('governorMessage').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not retrieve governor message with an invalid id', (done) => {
    request.get(`${governorMessagePath}/76jkhdh868`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to retrieve the list governor messages', (done) => {
    request.get(`${governorMessagePath}/list`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.items[0]).to.have.property('governorName').be.a('string');
        expect(response.items[0]).to.have.property('governorMessage').be.a('string');
        expect(response.items[0]).to.have.property('createdAt').be.a('string');
        expect(response.items[0]).to.have.property('updatedAt').be.a('string');
        expect(response.items[0]).to.have.property('archived').be.a('boolean');
        expect(response.items[0]).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to archive the governor messages by id', (done) => {
    request.delete(`${governorMessagePath}/${data.id}/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('governorName').be.a('string');
        expect(response.item).to.have.property('governorMessage').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(true);
        done();
      });
  });

  it('expect to not archive the governor messages with an invalid id', (done) => {
    request.delete(`${governorMessagePath}/89787sjhkf98379/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });
});
