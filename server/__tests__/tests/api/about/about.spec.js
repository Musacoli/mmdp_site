/* eslint-disable no-underscore-dangle */
import expect from 'expect';
import {
  app,
  removeAllGroupsAndUsers,
  removeAllCollections,
} from '../../../helpers/commons/base';
import About from '../../../../models/about/About';
import { createAbout, makeAbout } from '../../../helpers/about/about';

const data = {
  about: 'about must at least be twenty characters in number',
  background: 'background must at least be twenty characters in number',
};

const aboutPath = '/api/v1/about/about-mmdp';

const apiCreateAbout = async (payload) =>
  app.post(`${aboutPath}/create`).send(payload);

const apiUpdateAbout = async (id, payload) =>
  app.put(`${aboutPath}/${id}/update`).send(payload);

const apiGetAbout = async (id) => app.get(`${aboutPath}/${id}`).send();

const apiListAbout = async () => app.get(`${aboutPath}/list`).send();

describe('About message API', () => {
  describe('Create About message', () => {
    beforeEach(async () => {
      await removeAllCollections(About);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.create']);
    });

    it('should create About message message', async () => {
      const res = await apiCreateAbout(data);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        about: data.about,
        background: data.background,
      });
    });

    it('should create with full about or cms permissions', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiCreateAbout(data)).status).toBe(200);
      await app.loginRandom(['cms.create']);
      expect((await apiCreateAbout(data)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiCreateAbout(data)).status).toBe(200);
    });

    it('should not create About message with invalid fields', async () => {
      const res = await apiCreateAbout({
        about: 'worng words',
        background: 'nothing',
      });
      expect(res.body.errors).toEqual([
        'About must be twenty(20)  characters minimum',
        'Background text must be twenty(20)  characters minimum',
      ]);
    });

    it('should not create About message with empty fields', async () => {
      const res = await apiCreateAbout({});
      expect(res.body.errors).toEqual([
        'About is required',
        'Background information is required',
      ]);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiCreateAbout(data);
      expect(res.status).toBe(403);
    });
  });

  describe('Update About message', () => {
    let existingAbout;
    let newData;

    beforeEach(async () => {
      await removeAllCollections(About);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.update']);
      existingAbout = await createAbout();
      newData = makeAbout();
    });

    it('should update About message by id', async () => {
      const updated = (await apiUpdateAbout(existingAbout._id, newData)).body
        .item;
      expect(updated).toMatchObject(newData);
    });

    it('should update with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiUpdateAbout(existingAbout._id, newData)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.update']);
      expect((await apiUpdateAbout(existingAbout._id, newData)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.*']);
      expect((await apiUpdateAbout(existingAbout._id, newData)).status).toBe(
        200,
      );
    });

    it('should not update About message with an invalid id', async () => {
      const res = await apiUpdateAbout('899jkdhkj9790', newData);
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiUpdateAbout(existingAbout._id, newData);
      expect(res.status).toBe(403);
    });
  });

  describe('Get About message', () => {
    let existingAbout;

    beforeEach(async () => {
      await removeAllCollections(About);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.view']);
      existingAbout = await createAbout();
    });

    it('should get About message by id', async () => {
      const res = await apiGetAbout(existingAbout._id);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        about: existingAbout.about,
        background: existingAbout.background,
      });
    });

    it('should retrieve with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiGetAbout(existingAbout._id)).status).toBe(200);
      await app.loginRandom(['cms.view']);
      expect((await apiGetAbout(existingAbout._id)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiGetAbout(existingAbout._id)).status).toBe(200);
    });

    it('should not retrieve About message with an invalid id', async () => {
      const res = await apiGetAbout('76jkhdh868');
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiGetAbout(existingAbout._id);
      expect(res.status).toBe(403);
    });
  });

  describe('List About messages', () => {
    beforeEach(async () => {
      await removeAllCollections(About);
      await Promise.all([...Array(5)].map(() => createAbout()));
    });

    it('should retrieve the list of Abouts', async () => {
      const abouts = await About.model.find({});
      const res = await apiListAbout();
      expect(res.status).toBe(200);
      for (let i = 0; i < 5; i += 1) {
        expect(res.body.items[i]).toMatchObject({
          about: abouts[i].about,
          background: abouts[i].background,
        });
      }
    });
  });
});
