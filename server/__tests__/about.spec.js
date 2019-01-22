import chai from 'chai';
import supertest from 'supertest';
import keystone from './helpers/keystone';

const { expect } = chai;

const request = supertest(keystone.app);
const aboutPath = '/api/v1/about/about-mmdp';

const data = {
  about: 'about must atleast be twenty characters in number',
  background: 'background must atleast be twenty characters in number',
  id: '',
};


describe('About message API', () => {
  before((done) => {
    const About = keystone.list('About');
    About.model.remove({}, done);
  });

  it('expect to create About message message', (done) => {
    request.post(`${aboutPath}/create`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        data.id = response.item._id;
        expect(response.item).to.have.property('about').be.a('string');
        expect(response.item).to.have.property('background').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not create About message with invalid fields', (done) => {
    request.post(`${aboutPath}/create`)
      .send({ about: 'worng words', background: 'nothing' })
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Background text must be twenty(20)  characters minimum');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('About must be twenty(20)  characters minimum');
        done();
      });
  });

  it('expect to not create About message with empty fields', (done) => {
    request.post(`${aboutPath}/create`)
      .send({})
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response).to.have.property('errors').to.be.an('array');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('Background information is required');
        expect(response).to.have.property('errors').to.be.an('array').that.does.include('About is required');
        done();
      });
  });

  it('expect to update About message by id', (done) => {
    request.put(`${aboutPath}/${data.id}/update`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('background').be.a('string');
        expect(response.item).to.have.property('about').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not update About message with an invalid id', (done) => {
    request.put(`${aboutPath}/899jkdhkj9790/update`)
      .send(data)
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to get About message by id', (done) => {
    request.get(`${aboutPath}/${data.id}`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('background').be.a('string');
        expect(response.item).to.have.property('about').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to not retrieve About message with an invalid id', (done) => {
    request.get(`${aboutPath}/76jkhdh868`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });

  it('expect to retrieve the list of Abouts', (done) => {
    request.get(`${aboutPath}/list`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.items[0]).to.have.property('background').be.a('string');
        expect(response.items[0]).to.have.property('about').be.a('string');
        expect(response.items[0]).to.have.property('createdAt').be.a('string');
        expect(response.items[0]).to.have.property('updatedAt').be.a('string');
        expect(response.items[0]).to.have.property('archived').be.a('boolean');
        expect(response.items[0]).to.have.property('archived').to.equal(false);
        done();
      });
  });

  it('expect to archive the Abouts by id', (done) => {
    request.delete(`${aboutPath}/${data.id}/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(response.item).to.have.property('background').be.a('string');
        expect(response.item).to.have.property('about').be.a('string');
        expect(response.item).to.have.property('createdAt').be.a('string');
        expect(response.item).to.have.property('updatedAt').be.a('string');
        expect(response.item).to.have.property('archived').be.a('boolean');
        expect(response.item).to.have.property('archived').to.equal(true);
        done();
      });
  });

  it('expect to not archive the Abouts with an invalid id', (done) => {
    request.delete(`${aboutPath}/89787sjhkf98379/remove`)
      .send()
      .end((err, res) => {
        const response = JSON.parse(res.text);
        expect(res).to.have.property('statusCode').to.equal(500);
        expect(response).to.have.property('error').to.equal('database error');
        done();
      });
  });
});
