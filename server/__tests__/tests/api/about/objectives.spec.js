/* eslint-disable no-underscore-dangle */
import expect from 'expect';
import {
  app,
  removeAllGroupsAndUsers,
  removeAllCollections,
} from '../../../helpers/commons/base';
import Objective from '../../../../models/about/Objectives';
import {
  makeObjective,
  createObjective,
} from '../../../helpers/about/objectives';

const objectivesPath = '/api/v1/about/objectives';

const data = {
  Objectives: 'Objectives must at least be twenty characters in number',
};

const apiCreateObjective = async (payload) =>
  app.post(`${objectivesPath}/create`).send(payload);

const apiUpdateObjective = async (id, payload) =>
  app.put(`${objectivesPath}/${id}/update`).send(payload);

const apiGetObjective = async (id) => app.get(`${objectivesPath}/${id}`).send();

const apiListObjectives = async () => app.get(`${objectivesPath}/list`).send();

describe('Objectives API', () => {
  describe('create objectives', () => {
    beforeEach(async () => {
      await removeAllCollections(Objective);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.create']);
    });

    it('expect to create Objectives message', async () => {
      const res = await apiCreateObjective(data);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        Objectives: data.Objectives,
      });
    });

    it('should create with full about or cms permissions', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiCreateObjective(data)).status).toBe(200);
      await app.loginRandom(['cms.create']);
      expect((await apiCreateObjective(data)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiCreateObjective(data)).status).toBe(200);
    });

    it('expect to not create Objectives with invalid fields', async () => {
      const res = await apiCreateObjective({ Objectives: 'worng words' });
      expect(res.body.errors).toEqual([
        'Objectives must be twenty(20)  characters minimum',
      ]);
    });

    it('expect to not create Objectives with empty fields', async () => {
      const res = await apiCreateObjective({});
      expect(res.body.errors).toEqual(['Objectives is required']);
    });
  });

  describe('update objectives', () => {
    let existingObjective;
    let newData;

    beforeEach(async () => {
      await removeAllCollections(Objective);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.update']);
      existingObjective = await createObjective();
      newData = makeObjective();
    });

    it('expect to update Objectives by id', async () => {
      const updated = (await apiUpdateObjective(existingObjective._id, newData))
        .body.item;

      expect(updated).toMatchObject(newData);
    });

    it('should update with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect(
        (await apiUpdateObjective(existingObjective._id, newData)).status,
      ).toBe(200);
      await app.loginRandom(['cms.update']);
      expect(
        (await apiUpdateObjective(existingObjective._id, newData)).status,
      ).toBe(200);
      await app.loginRandom(['cms.*']);
      expect(
        (await apiUpdateObjective(existingObjective._id, newData)).status,
      ).toBe(200);
    });

    it('expect to not update Objectives with an invalid id', async () => {
      const res = await apiUpdateObjective('899jkdhkj9790', newData);
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiUpdateObjective(existingObjective._id, newData);
      expect(res.status).toBe(403);
    });
  });

  describe('get objective', () => {
    let existingMessage;

    beforeEach(async () => {
      await removeAllCollections(Objective);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.view']);
      existingMessage = await createObjective();
    });

    it('expect to get Objectives by id', async () => {
      const res = await apiGetObjective(existingMessage._id);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        Objectives: existingMessage.Objectives,
      });
    });

    it('should retrieve with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiGetObjective(existingMessage._id)).status).toBe(200);
      await app.loginRandom(['cms.view']);
      expect((await apiGetObjective(existingMessage._id)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiGetObjective(existingMessage._id)).status).toBe(200);
    });

    it('expect to not retrieve Objectives with an invalid id', async () => {
      const res = await apiGetObjective('76jkhdh868');
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiGetObjective(existingMessage._id);
      expect(res.status).toBe(403);
    });
  });

  describe('list objectives', () => {
    beforeEach(async () => {
      await removeAllCollections(Objective);
      await Promise.all([...Array(5)].map(() => createObjective()));
    });

    it('expect to retrieve the list of Objectives', async () => {
      const objectives = await Objective.model.find({});
      const res = await apiListObjectives();
      expect(res.status).toBe(200);
      for (let i = 0; i < 5; i += 1) {
        expect(res.body.items[i]).toMatchObject({
          Objectives: objectives[i].Objectives,
        });
      }
    });
  });
});
