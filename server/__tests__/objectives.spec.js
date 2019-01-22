import chai from 'chai';
import supertest from 'supertest';
import keystone from './helpers/keystone';

const { expect } = chai;

const request = supertest(keystone.app);
const objectivesPath = '/api/v1/about/objectives';

const data = {
  Objectives: 'Objectives must atleast be twenty characters in number',
  id: '',
};


describe('Objectives API', () => {
  before((done) => {
    const EdoStateApproach = keystone.list('EdoStateApproach');
    EdoStateApproach.model.remove({}, done);
  });

  it('expect to create Objectives message', (done) => {
    request.post(`${objectivesPath}/create`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        data.id = response.item._id;
        expect(response.item).to.have.property('Objectives').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not create Objectives with invalid fields', (done) => {
    request.post(`${objectivesPath}/create`)
      .send({ Objectives: 'worng words' })
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Objectives must be twenty(20)  characters minimum');
        done();
      });
  });

  it('expect to not create Objectives with empty fields', (done) => {
    request.post(`${objectivesPath}/create`)
      .send({})
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Objectives is required');
        done();
      });
  });

  it('expect to update Objectives by id', (done) => {
    request.put(`${objectivesPath}/${data.id}/update`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('Objectives').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not update Objectives with an invalid id', (done) => {
    request.put(`${objectivesPath}/899jkdhkj9790/update`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to get Objectives by id', (done) => {
    request.get(`${objectivesPath}/${data.id}`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('Objectives').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not retrieve Objectives with an invalid id', (done) => {
    request.get(`${objectivesPath}/76jkhdh868`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to retrieve the list of Objectives', (done) => {
    request.get(`${objectivesPath}/list`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.items[0]).to.have.property('Objectives').be.a('string');
        expect(response.items[0]).to.have.property('createdAt').be.a('string');
        expect(response.items[0]).to.have.property('updatedAt').be.a('string');
        expect(response.items[0]).to.have.property('archived').be.a('boolean');
        expect(response.items[0]).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to archive the Objectives by id', (done) => {
    request.delete(`${objectivesPath}/${data.id}/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('Objectives').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(true);
        done();
      });
  });

  it('expect to not archive the Objectives with an invalid id', (done) => {
    request.delete(`${objectivesPath}/89787sjhkf98379/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });
});
