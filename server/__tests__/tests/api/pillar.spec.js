import expect from 'expect';
import {
  app,
  removeAllGroupsAndUsers,
  removeAllModels,
} from '../../helpers/commons/base';

import Pillar from '../../../models/Pillar';
import {
  makeThematicPillar,
  createThematicPillar,
} from '../../helpers/pillars/pillar';

const pillarPath = `/api/v1/pillars`;

const data = {
  title: 'I am brand new',
  introduction: 'This is very new',
  whatWeAreDoing: 'I am doing thaattt',
  keyActivities: 'I am brand new',
  _id: '',
};

const apiCreatePillar = async (payload) =>
  app.post(`${pillarPath}`).send(payload);

const apiUpdatePillar = async (id, payload) =>
  app.put(`${pillarPath}/${id}/update`).send(payload);

const apiGetPillar = async (id) => app.get(`${pillarPath}/${id}`).send();

const apiListPillars = async () => app.get(`${pillarPath}`).send();

describe('Pillar API', () => {
  describe('create pillar message', () => {
    beforeEach(async () => {
      await removeAllModels(Pillar);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.pillars.create']);
    });

    it('expect to create pillar', async () => {
      const res = await apiCreatePillar(data);
      expect(res.status).toBe(200);
      expect(res.body.pillar).toMatchObject({
        title: data.title,
        introduction: data.introduction,
        whatWeAreDoing: data.whatWeAreDoing,
        keyActivities: data.keyActivities,
      });
    });
    it('should create with full pillars or cms permissions', async () => {
      await app.loginRandom(['cms.pillars.*']);
      expect((await apiCreatePillar(data)).status).toBe(200);
      await app.loginRandom(['cms.pillars.create']);
      expect((await apiCreatePillar(data)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiCreatePillar(data)).status).toBe(200);
    });

    it('expect to not create pillar with empty fields', async () => {
      const res = await apiCreatePillar({});
      expect(res.body.errors).toEqual([
        'Title is required',
        'Introduction is required',
        'whatWeAreDoing is required',
        'Key activities is required',
      ]);
    });
    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiCreatePillar(data);
      expect(res.status).toBe(403);
    });
  });

  describe('update thematic pillar', () => {
    let existingPillar;
    let newData;

    beforeEach(async () => {
      await removeAllModels(Pillar);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.pillars.update']);
      existingPillar = await createThematicPillar();
      newData = makeThematicPillar();
    });

    it('expect to update pillar by id', async () => {
      const updated = (await apiUpdatePillar(existingPillar.id, newData)).body
        .pillar;
      expect(updated).toMatchObject(newData);
    });

    it('should update with full pillars or cms permission', async () => {
      await app.loginRandom(['cms.pillars.*']);
      expect((await apiUpdatePillar(existingPillar.id, newData)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.update']);
      expect((await apiUpdatePillar(existingPillar.id, newData)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.*']);
      expect((await apiUpdatePillar(existingPillar.id, newData)).status).toBe(
        200,
      );
    });

    it('expect to not update pillar with an invalid id', async () => {
      const res = await apiUpdatePillar('899jkdhkj9790', newData);
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiUpdatePillar(existingPillar._id, newData);
      expect(res.status).toBe(403);
    });
  });

  describe('get thematic pillar', () => {
    let existingPillar;

    beforeEach(async () => {
      await removeAllModels(Pillar);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.pillars.view']);
      existingPillar = await createThematicPillar();
    });

    it('expect to get pillar by id', async () => {
      const res = await apiGetPillar(existingPillar._id);
      expect(res.status).toBe(200);
      expect(res.body.pillar).toMatchObject({
        title: existingPillar.title,
        introduction: existingPillar.introduction,
        whatWeAreDoing: existingPillar.whatWeAreDoing,
        keyActivities: existingPillar.keyActivities,
      });
    });

    it('should retrieve with full pillars or cms permission', async () => {
      await app.loginRandom(['cms.pillars.*']);
      expect((await apiGetPillar(existingPillar._id)).status).toBe(200);
      await app.loginRandom(['cms.view']);
      expect((await apiGetPillar(existingPillar._id)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiGetPillar(existingPillar._id)).status).toBe(200);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiGetPillar(existingPillar._id);
      expect(res.status).toBe(403);
    });
  });

  describe('list all thematic pillars', () => {
    beforeEach(async () => {
      await removeAllModels(Pillar);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.pillars.view']);
      await Promise.all([...Array(5)].map(() => createThematicPillar()));
    });

    it('expect to retrieve the list of thematic pillars', async () => {
      const pillars = await Pillar.model.find({});
      const res = await apiListPillars();
      expect(res.status).toBe(200);
      for (let i = 0; i < 5; i += 1) {
        expect(res.body.pillars[i]).toMatchObject({
          title: pillars[i].title,
          introduction: pillars[i].introduction,
          whatWeAreDoing: pillars[i].whatWeAreDoing,
          keyActivities: pillars[i].keyActivities,
        });
      }
    });

    it('should retrieve with full pillars or cms permission', async () => {
      await app.loginRandom(['cms.pillars.*']);
      expect((await apiListPillars()).status).toBe(200);
      await app.loginRandom(['cms.view']);
      expect((await apiListPillars()).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiListPillars()).status).toBe(200);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiListPillars();
      expect(res.status).toBe(403);
    });
  });
});
