/* eslint-disable no-underscore-dangle */
import expect from 'expect';
import keystone from 'keystone';
import { app, removeAllGroupsAndUsers } from '../../helpers/commons/base';
import { createEvent, removeAllEvents } from '../../helpers/events';
import { stubModelUpdateProcess } from '../../helpers/files';

const eventsUrl = '/api/v1/events';
const imageUploadUrl = `${__dirname}/../../helpers/files/test-img.png`;

export const Event = keystone.list('Event');

const apiCreateEvent = async () =>
  app
    .post(`${eventsUrl}`)
    .field('title', 'Hello World')
    .field('details', 'This is an Event')
    .field('eventDate', '2019-02-22')
    .attach('headerImage', imageUploadUrl);

const apiListEvents = (parameters = {}) => {
  return app
    .get(`${eventsUrl}`)
    .query(parameters)
    .send();
};

const apiArchiveEvent = (id) => {
  return app.patch(`${eventsUrl}/${id}/archive`).send();
};

const apiGetEvent = (id) => {
  return app.get(`${eventsUrl}/${id}`).send();
};

const apiUpdateEvent = (id, data = { mainEvent: true }) => {
  return app.put(`${eventsUrl}/${id}`).send(data);
};

const apiDeleteEvent = (id) => {
  return app.delete(`${eventsUrl}/${id}`).send();
};

describe('Events API', () => {
  let stub;

  before(() => {
    stub = stubModelUpdateProcess('img', 'headerImage');
  });

  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllEvents();
  });

  describe('GET /events', () => {
    beforeEach(async () => {
      await app.loginRandom([]);
    });

    it('returns a list of events', async () => {
      const res = await apiListEvents();
      expect(res.statusCode).toBe(200);
    });

    it('should filter by GET parameters - no match', async () => {
      const res = await apiListEvents({ title: '1A2b3C4d5E' });
      expect(res.statusCode).toBe(200);
    });

    it('should filter by GET parameters - match', async () => {
      // create 3 events with title 'Foo'
      await createEvent({ title: 'Foo' }, 3);
      const res = await apiListEvents({ title: 'Foo' });
      expect(res.body.data.length).toBe(3);
    });

    it('should exclude archived events for guests', async () => {
      await app.logout();
      await removeAllEvents();
      // create 3 events that are archived
      await createEvent({ archived: true }, 3);
      // create 2 events that are not archived
      await createEvent({ archived: false }, 2);
      const res = await apiListEvents();
      expect(res.body.data.length).toBe(2);
    });
  });

  describe('Archive/Unarchive', () => {
    let existingEvent;

    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.events.update']);
      existingEvent = await createEvent();
    });

    it('should archive Event', async () => {
      existingEvent = await createEvent({
        archived: false,
      });
      const res = await apiArchiveEvent(existingEvent._id);
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual('Event archived successfully');
    });

    it('should archive with all other relevant permissions', async () => {
      await app.loginRandom(['cms.events.*']);
      expect((await apiArchiveEvent(existingEvent._id)).status).toBe(200);
      await app.loginRandom(['cms.update']);
      expect((await apiArchiveEvent(existingEvent._id)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiArchiveEvent(existingEvent._id)).status).toBe(200);
    });

    it('should restore event', async () => {
      existingEvent = await createEvent({
        archived: true,
      });
      const res = await apiArchiveEvent(existingEvent._id);
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual('Event unarchived successfully');
    });

    it('should fail if invalid object id is used', async () => {
      const res = await apiArchiveEvent('invalid id');
      expect(res.status).toBe(404);
      expect(res.body.message).toEqual('Event with that id doesnot exist');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiArchiveEvent(existingEvent._id);
      expect(res.status).toBe(403);
    });
  });

  describe('POST /events', () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.events.create']);
    });

    it('create an event', async () => {
      const res = await apiCreateEvent();
      expect(res.status).toBe(201);
    });

    it('Bad Object', async () => {
      const res = await app
        .post(`${eventsUrl}`)
        .field('mainEvent', true)
        .attach('headerImage', imageUploadUrl);
      expect(res.status).toBe(400);
    });

    it('should fail for unauthorized users', async () => {
      await app.loginRandom();
      const res = await apiCreateEvent();
      expect(res.status).toBe(403);
    });

    it('should list for all relevant permissions', async () => {
      await app.loginRandom(['cms.events.*']);
      expect((await apiCreateEvent()).status).toBe(201);
      await app.loginRandom(['cms.create']);
      expect((await apiCreateEvent()).status).toBe(201);
      await app.loginRandom(['cms.*']);
      expect((await apiCreateEvent()).status).toBe(201);
    });
  });

  describe('GET /events/:id', () => {
    let existing;

    beforeEach(async () => {
      await app.loginRandom(['cms.events.view']);
      existing = await createEvent();
    });

    it('Get a single event', async () => {
      const response = await apiGetEvent(existing._id);
      expect(response.status).toBe(200);
    });

    it('Invalid Event Id', async () => {
      const res = await apiGetEvent(3246827);
      expect(res.status).toBe(404);
    });

    it('should pass for guest users', async () => {
      await app.loginRandom();
      const res = await apiGetEvent(existing._id);
      expect(res.status).toBe(200);
    });

    it('should list for all relevant permissions', async () => {
      await app.loginRandom(['cms.events.*']);
      expect((await apiGetEvent(existing._id)).status).toBe(200);
      await app.loginRandom(['cms.view']);
      expect((await apiGetEvent(existing._id)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiGetEvent(existing._id)).status).toBe(200);
    });
  });

  describe('UPDATE /events', () => {
    let existing;

    beforeEach(async () => {
      await app.loginRandom(['cms.events.update']);
      existing = await createEvent();
    });

    it('update an event', async () => {
      const response = await apiUpdateEvent(existing._id);
      expect(response.status).toBe(200);
    });

    it('Invalid Event Id', async () => {
      const res = await apiUpdateEvent('3246827');
      expect(res.status).toBe(404);
    });

    it('should fail for unauthorized users', async () => {
      await app.loginRandom();
      const res = await apiUpdateEvent(existing._id);
      expect(res.status).toBe(403);
    });

    it('should list for all relevant permissions', async () => {
      await app.loginRandom(['cms.events.*']);
      expect((await apiUpdateEvent(existing._id)).status).toBe(200);
      await app.loginRandom(['cms.update']);
      expect((await apiUpdateEvent(existing._id)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiUpdateEvent(existing._id)).status).toBe(200);
    });
  });

  describe('DELETE /events', () => {
    let existing;

    beforeEach(async () => {
      await app.loginRandom(['cms.events.delete']);
      existing = await createEvent();
    });

    it('delete an event', async () => {
      const response = await app.delete(`${eventsUrl}/${existing._id}`).send();
      expect(response.status).toBe(200);
    });

    it('Invalid Event Id', async () => {
      const res = await app.delete(`${eventsUrl}/3246827`).send();
      expect(res.status).toBe(404);
    });

    it('should fail for unauthorized users', async () => {
      await app.loginRandom();
      const res = await apiDeleteEvent(existing._id);
      expect(res.status).toBe(403);
    });

    it('should list for all relevant permissions', async () => {
      const events = await createEvent({}, 3);
      await app.loginRandom(['cms.events.*']);
      expect((await apiDeleteEvent(events[0]._id)).status).toBe(200);
      await app.loginRandom(['cms.delete']);
      expect((await apiDeleteEvent(events[1]._id)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiDeleteEvent(events[2]._id)).status).toBe(200);
    });
  });

  after(() => {
    stub.restore();
  });
});
