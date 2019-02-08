/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import expect from 'expect';
import keystone from '../../helpers/commons';
import { app } from '../../helpers/commons/base';

chai.should();

const dbURI =
  process.env.MONGODB_URL || 'mongodb://localhost/mongodb://127.0.0.1/mmdp-cms';

describe('Events', () => {
  before((done) => {
    if (keystone.mongoose.connection.db) return done();
    keystone.mongoose.connect(dbURI, done);
  });

  it('should be a connection to Mongo', (done) => {
    keystone.mongoose.connection.db.should.be.a('Object');
    done();
  });

  it('should be a Mongoose Model', (done) => {
    const Events = keystone.list('Events');

    Events.should.be.a('Object');
    Events.should.have.property('model').be.a('Function');
    Events.should.have.property('schema').be.a('Object');
    done();
  });
});

const eventsUrl = '/api/v1/events';
const imageUploadUrl = `${__dirname}/../../helpers/img/test-img.png`;

const apiCreateEvent = async () =>
  app
    .post(`${eventsUrl}`)
    .field('title', 'Hello World')
    .field('details', 'This is an Event')
    .field('eventDate', '2019-02-22')
    .attach('headerImage', imageUploadUrl);

describe('GET /events', () => {
  it('returns a list of events', async () => {
    await app.loginRandom(['events.*']);
    const res = await app.get(`${eventsUrl}`).send();
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /events', () => {
  it('create an event', async () => {
    await app.loginRandom(['events.*']);
    const res = await apiCreateEvent();
    expect(res.statusCode).toBe(201);
  });

  it('Bad Object', async () => {
    await app.loginRandom(['events.*']);
    const res = await app
      .post(`${eventsUrl}`)
      .field('mainEvent', true)
      .attach('headerImage', imageUploadUrl);
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /events/:id', () => {
  it('Get a single event', async () => {
    await app.loginRandom(['events.*']);
    const res = await apiCreateEvent();

    const resp = res.body;
    const id = resp.data._id;
    const response = await app.get(`${eventsUrl}/${id}`).send();
    expect(response.statusCode).toBe(200);
  });

  it('Invalid Event Id', async () => {
    await app.loginRandom(['events.*']);
    const res = await app.get(`${eventsUrl}3246827`).send();
    expect(res.statusCode).toBe(404);
  });
});

describe('UPDATE /events', () => {
  it('update an event', async () => {
    await app.loginRandom(['events.*']);
    const res = await apiCreateEvent();

    const resp = res.body;
    const id = resp.data._id;
    const response = await app
      .put(`${eventsUrl}/${id}`)
      .send({ mainEvent: true });
    expect(response.statusCode).toBe(200);
  });

  it('Invalid Event Id', async () => {
    await app.loginRandom(['events.*']);
    const res = await app.put(`${eventsUrl}/3246827`).send();
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /events', () => {
  it('delete an event', async () => {
    await app.loginRandom(['events.*']);
    const res = await apiCreateEvent();

    const resp = res.body;
    const id = resp.data._id;
    const response = await app.delete(`${eventsUrl}/${id}`).send();
    expect(response.statusCode).toBe(200);
  });

  it('Invalid Event Id', async () => {
    await app.loginRandom(['events.*']);
    const res = await app.delete(`${eventsUrl}/3246827`).send();
    expect(res.statusCode).toBe(404);
  });
});
