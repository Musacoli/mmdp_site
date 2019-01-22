import chai from 'chai';
import supertest from 'supertest';
import keystone from './helpers/keystone';

const { expect } = chai;

const request = supertest(keystone.app);
const edoStateApproachPath = '/api/v1/about/edo-state-approach';

const data = {
  theEdoStateApproach: 'theEdoStateApproach must atleast be twenty characters in number',
  background: 'background must atleast be twenty characters in number',
  id: '',
};


describe('Edo State Approach API', () => {
  before((done) => {
    const EdoStateApproach = keystone.list('EdoStateApproach');
    EdoStateApproach.model.remove({}, done);
  });

  it('expect to create Edo State Approach message', (done) => {
    request.post(`${edoStateApproachPath}/create`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        data.id = response.item._id;
        expect(response.item).to.have.property('theEdoStateApproach').be.a('string');
        expect(response.item).to.have.property('background').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not create Edo State Approach with invalid fields', (done) => {
    request.post(`${edoStateApproachPath}/create`)
      .send({ theEdoStateApproach: 'worng words', background: 'nothing' })
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Background text must be twenty(20)  characters minimum');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('The Edo State Approach must be twenty(20)  characters minimum');
        done();
      });
  });

  it('expect to not create Edo State Approach with empty fields', (done) => {
    request.post(`${edoStateApproachPath}/create`)
      .send({})
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Background information is required');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('The Edo State Approach is required');
        done();
      });
  });

  it('expect to update Edo State Approach by id', (done) => {
    request.put(`${edoStateApproachPath}/${data.id}/update`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('background').be.a('string');
        expect(response.item).to.have.property('theEdoStateApproach').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not update Edo State Approach with an invalid id', (done) => {
    request.put(`${edoStateApproachPath}/899jkdhkj9790/update`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to get Edo State Approach by id', (done) => {
    request.get(`${edoStateApproachPath}/${data.id}`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('background').be.a('string');
        expect(response.item).to.have.property('theEdoStateApproach').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not retrieve Edo State Approach with an invalid id', (done) => {
    request.get(`${edoStateApproachPath}/76jkhdh868`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to retrieve the list of Edo State Approachs', (done) => {
    request.get(`${edoStateApproachPath}/list`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.items[0]).to.have.property('background').be.a('string');
        expect(response.items[0]).to.have.property('theEdoStateApproach').be.a('string');
        expect(response.items[0]).to.have.property('createdAt').be.a('string');
        expect(response.items[0]).to.have.property('updatedAt').be.a('string');
        expect(response.items[0]).to.have.property('archived').be.a('boolean');
        expect(response.items[0]).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to archive the Edo State Approachs by id', (done) => {
    request.delete(`${edoStateApproachPath}/${data.id}/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('background').be.a('string');
        expect(response.item).to.have.property('theEdoStateApproach').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(true);
        done();
      });
  });

  it('expect to not archive the Edo State Approachs with an invalid id', (done) => {
    request.delete(`${edoStateApproachPath}/89787sjhkf98379/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });
});
