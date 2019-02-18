/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import expect from 'expect';
import sinon from 'sinon';
import { app, removeAllGroupsAndUsers } from '../../helpers/commons/base';
import modelHelper from '../../../helpers/modelHelper';
import { createEvent } from '../../helpers/events';

chai.should();

const eventsUrl = '/api/v1/events';
const imageUploadUrl = `${__dirname}/../../helpers/img/test-img.png`;

const apiCreateEvent = async () =>
  app
    .post(`${eventsUrl}`)
    .field('title', 'Hello World')
    .field('details', 'This is an Event')
    .field('eventDate', '2019-02-22')
    .attach('headerImage', imageUploadUrl);

describe('Events route', () => {
  before(async () => {
    await app.loginRandom(['events.*']);
  });
  after(async () => {
    await removeAllGroupsAndUsers();
  });
  describe('GET /events', () => {
    it('returns a list of events', async () => {
      const res = await app.get(`${eventsUrl}`).send();
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /events', () => {
    it('create an event', async () => {
      const stub = sinon
        .stub(modelHelper, 'process')
        .resolves(Promise.resolve({}));

      const res = await apiCreateEvent();
      expect(res.statusCode).toBe(201);
      stub.restore();
    });

    it('Bad Object', async () => {
      const res = await app
        .post(`${eventsUrl}`)
        .field('mainEvent', true)
        .attach('headerImage', imageUploadUrl);
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /events/:id', () => {
    it('Get a single event', async () => {
      const event = await createEvent();
      const { _id: id } = event;
      const response = await app.get(`${eventsUrl}/${id}`).send();
      expect(response.statusCode).toBe(200);
    });

    it('Invalid Event Id', async () => {
      const res = await app.get(`${eventsUrl}3246827`).send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe('UPDATE /events', () => {
    it('update an event', async () => {
      const event = await createEvent();
      const { _id: id } = event;
      const response = await app
        .put(`${eventsUrl}/${id}`)
        .send({ mainEvent: true });
      expect(response.statusCode).toBe(200);
    });

    it('Invalid Event Id', async () => {
      const res = await app.put(`${eventsUrl}/3246827`).send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /events', () => {
    it('delete an event', async () => {
      const event = await createEvent();
      const { _id: id } = event;
      const response = await app.delete(`${eventsUrl}/${id}`).send();
      expect(response.statusCode).toBe(200);
    });

    it('Invalid Event Id', async () => {
      const res = await app.delete(`${eventsUrl}/3246827`).send();
      expect(res.statusCode).toBe(404);
    });
  });
});
