/* eslint-disable no-underscore-dangle */
import expect from 'expect';
import {
  app,
  removeAllGroupsAndUsers,
  removeAllCollections,
} from '../../../helpers/commons/base';
import EdoStateApproach from '../../../../models/EdoStateApproach';
import {
  makeEdoStateApproach,
  createEdoStateApproach,
} from '../../../helpers/about/edoStateApproach';
import GovernorMessage from '../../../../models/GovernorMessage';

const edoStateApproachPath = '/api/v1/about/edo-state-approach';

const data = {
  theEdoStateApproach:
    'theEdoStateApproach must at least be twenty characters in number',
  background: 'background must at least be twenty characters in number',
};

const apiCreateEdoStateApproach = async (payload) =>
  app.post(`${edoStateApproachPath}/create`).send(payload);

const apiUpdateEdoStateApproach = async (id, payload) =>
  app.put(`${edoStateApproachPath}/${id}/update`).send(payload);

const apiGetEdoStateApproach = async (id) =>
  app.get(`${edoStateApproachPath}/${id}`).send();

const apiListEdoStateApproach = async () =>
  app.get(`${edoStateApproachPath}/list`).send();

describe('Edo State Approach API', () => {
  describe('Create Edo State Approach', () => {
    beforeEach(async () => {
      await removeAllCollections(GovernorMessage);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.create']);
    });

    it('expect to create Edo State Approach message', async () => {
      const res = await apiCreateEdoStateApproach(data);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        theEdoStateApproach: data.theEdoStateApproach,
        background: data.background,
      });
    });

    it('should create with full about or cms permissions', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiCreateEdoStateApproach(data)).status).toBe(200);
      await app.loginRandom(['cms.create']);
      expect((await apiCreateEdoStateApproach(data)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiCreateEdoStateApproach(data)).status).toBe(200);
    });

    it('expect to not create Edo State Approach with invalid fields', async () => {
      const res = await apiCreateEdoStateApproach({
        theEdoStateApproach: 'worng words',
        background: 'nothing',
      });
      expect(res.body.errors).toEqual([
        'The Edo State Approach must be twenty(20)  characters minimum',
        'Background text must be twenty(20)  characters minimum',
      ]);
    });

    it('expect to not create Edo State Approach with empty fields', async () => {
      const res = await apiCreateEdoStateApproach({});
      expect(res.body.errors).toEqual([
        'The Edo State Approach is required',
        'Background information is required',
      ]);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiCreateEdoStateApproach(data);
      expect(res.status).toBe(403);
    });
  });

  describe('Update Edo State Approach', () => {
    let existingApproach;
    let newData;

    beforeEach(async () => {
      await removeAllCollections(EdoStateApproach);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.update']);
      existingApproach = await createEdoStateApproach();
      newData = makeEdoStateApproach();
    });

    it('expect to update Edo State Approach by id', async () => {
      const updated = (await apiUpdateEdoStateApproach(
        existingApproach._id,
        newData,
      )).body.item;
      expect(updated).toMatchObject(newData);
    });

    it('should update with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect(
        (await apiUpdateEdoStateApproach(existingApproach._id, newData)).status,
      ).toBe(200);
      await app.loginRandom(['cms.update']);
      expect(
        (await apiUpdateEdoStateApproach(existingApproach._id, newData)).status,
      ).toBe(200);
      await app.loginRandom(['cms.*']);
      expect(
        (await apiUpdateEdoStateApproach(existingApproach._id, newData)).status,
      ).toBe(200);
    });

    it('expect to not update Edo State Approach with an invalid id', async () => {
      const res = await apiUpdateEdoStateApproach('899jkdhkj9790', newData);
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiUpdateEdoStateApproach(
        existingApproach._id,
        newData,
      );
      expect(res.status).toBe(403);
    });
  });

  describe('Get Edo State Approach', () => {
    let existingApproach;

    beforeEach(async () => {
      await removeAllCollections(EdoStateApproach);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.view']);
      existingApproach = await createEdoStateApproach();
    });

    it('expect to get Edo State Approach by id', async () => {
      const res = await apiGetEdoStateApproach(existingApproach._id);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        theEdoStateApproach: existingApproach.theEdoStateApproach,
        background: existingApproach.background,
      });
    });

    it('should retrieve with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiGetEdoStateApproach(existingApproach._id)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.view']);
      expect((await apiGetEdoStateApproach(existingApproach._id)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.*']);
      expect((await apiGetEdoStateApproach(existingApproach._id)).status).toBe(
        200,
      );
    });

    it('expect to not retrieve Edo State Approach with an invalid id', async () => {
      const res = await apiGetEdoStateApproach('76jkhdh868');
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiGetEdoStateApproach(existingApproach._id);
      expect(res.status).toBe(403);
    });
  });

  describe('List Edo State Approach', () => {
    beforeEach(async () => {
      await removeAllCollections(EdoStateApproach);
      await Promise.all([...Array(5)].map(() => createEdoStateApproach()));
    });

    it('expect to retrieve the list of Edo State Approach', async () => {
      const approaches = await EdoStateApproach.model.find({});
      const res = await apiListEdoStateApproach();
      expect(res.status).toBe(200);
      for (let i = 0; i < 5; i += 1) {
        expect(res.body.items[i]).toMatchObject({
          theEdoStateApproach: approaches[i].theEdoStateApproach,
          background: approaches[i].background,
        });
      }
    });
  });
});
