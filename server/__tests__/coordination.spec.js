import chai from 'chai';
import supertest from 'supertest';
import keystone from './helpers/keystone';

const { expect } = chai;

const request = supertest(keystone.app);
const coordinationPath = '/api/v1/about/coordination';


const data = {
  highlight: ['this is a highlight'],
  coordination: 'coodination test data is here',
  whatAreWeDoing: 'whatare we doing here to the website place',
  introToHighlights: 'this is an introduction to our highlights at mmdp',
  id: '',
  highlightIds: [],
};


describe('Coordination API', () => {
  before((done) => {
    const Coordination = keystone.list('Coordination');
    Coordination.model.remove({}, done);
  });

  it('expect to create Coordination message', (done) => {
    request.post(`${coordinationPath}/create`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        data.id = response.item._id;
        data.highlightIds.push(response.item.highlight[0]);
        expect(response.item).to.have.property('coordination').be.a('string');
        expect(response.item).to.have.property('whatAreWeDoing').be.a('string');
        expect(response.item).to.have.property('introToHighlights').be.a('string');
        expect(response.item).to.have.property('highlight').be.a('array');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not create Coordination with invalid fields', (done) => {
    request.post(`${coordinationPath}/create`)
      .send({
        coordination: 'worng words', whatAreWeDoing: 'nothing', introToHighlights: 'there isnt', highlight: 'test',
      })
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('What are we doing must be twenty(20)  characters minimum');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Coordination information must be twenty(20)  characters minimum');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Introduction to Highlights must be twenty(20)  characters minimum');
        expect(res).to.have.property('statusCode').to.equal(400);
        done();
      });
  });

  it('expect to not create Coordination with empty fields', (done) => {
    request.post(`${coordinationPath}/create`)
      .send({})
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('What are we doing information is required');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Coordination information is required');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Introduction to Highlights is required');
        done();
      });
  });

  it('expect to update Coordination by id', (done) => {
    request.put(`${coordinationPath}/${data.id}/update`)
      .send({ ...data, highlight: data.highlightIds })
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('whatAreWeDoing').be.a('string');
        expect(response.item).to.have.property('coordination').be.a('string');
        expect(response.item).to.have.property('introToHighlights').be.a('string');
        expect(response.item).to.have.property('highlight').be.an('array');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not update Coordination with an invalid id', (done) => {
    request.put(`${coordinationPath}/899jkdhkj9790/update`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to get Coordination by id', (done) => {
    request.get(`${coordinationPath}/${data.id}`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('whatAreWeDoing').be.a('string');
        expect(response.item).to.have.property('coordination').be.a('string');
        expect(response.item).to.have.property('introToHighlights').be.a('string');
        expect(response.item).to.have.property('highlight').be.an('array');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not retrieve Coordination with an invalid id', (done) => {
    request.get(`${coordinationPath}/76jkhdh868`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to retrieve the list of Coordinations', (done) => {
    request.get(`${coordinationPath}/list`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.items[0]).to.have.property('whatAreWeDoing').be.a('string');
        expect(response.items[0]).to.have.property('coordination').be.a('string');
        expect(response.items[0]).to.have.property('introToHighlights').be.a('string');
        expect(response.items[0]).to.have.property('highlight').be.an('array');
        expect(response.items[0]).to.have.property('createdAt').be.a('string');
        expect(response.items[0]).to.have.property('updatedAt').be.a('string');
        expect(response.items[0]).to.have.property('archived').be.a('boolean');
        expect(response.items[0]).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to archive coordinations by id', (done) => {
    request.delete(`${coordinationPath}/${data.id}/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('whatAreWeDoing').be.a('string');
        expect(response.item).to.have.property('coordination').be.a('string');
        expect(response.item).to.have.property('introToHighlights').be.a('string');
        expect(response.item).to.have.property('highlight').be.an('array');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(true);
        done();
      });
  });

  it('expect to not archive coordinations with an invalid id', (done) => {
    request.delete(`${coordinationPath}/89787sjhkf98379/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });
});
