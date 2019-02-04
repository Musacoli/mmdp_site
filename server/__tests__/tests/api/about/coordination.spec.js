/* eslint-disable no-underscore-dangle */
import expect from 'expect';
import {
  app,
  removeAllGroupsAndUsers,
  removeAllModels,
} from '../../../helpers/commons/base';
import Coordination from '../../../../models/Coordination';
import {
  createCoordination,
  makeCoordination,
} from '../../../helpers/about/coordination';

const coordinationPath = '/api/v1/about/coordination';

const data = {
  highlight: ['this is a highlight'],
  coordination: 'coordination test data is here',
  whatAreWeDoing: 'what are we doing here to the website place',
  introToHighlights: 'this is an introduction to our highlights at mmdp',
};

const apiCreateCoordination = async (payload) =>
  app.post(`${coordinationPath}/create`).send(payload);

const apiUpdateCoordination = async (id, payload) =>
  app.put(`${coordinationPath}/${id}/update`).send(payload);

const apiGetCoordination = async (id) =>
  app.get(`${coordinationPath}/${id}`).send();

const apiListCoordination = async () =>
  app.get(`${coordinationPath}/list`).send();

const apiArchiveCoordination = async (id) =>
  app.delete(`${coordinationPath}/${id}/remove`).send();

describe('Coordination API', () => {
  describe('create coordination', () => {
    before(async () => {
      await removeAllModels(Coordination);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.create']);
    });

    it('expect to create Coordination message', async () => {
      const res = await apiCreateCoordination(data);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        coordination: data.coordination,
        whatAreWeDoing: data.whatAreWeDoing,
        introToHighlights: data.introToHighlights,
        archived: false,
      });
    });

    it('should create with full about or cms permissions', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiCreateCoordination(data)).status).toBe(200);
      await app.loginRandom(['cms.create']);
      expect((await apiCreateCoordination(data)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiCreateCoordination(data)).status).toBe(200);
    });

    it('expect to not create Coordination with invalid fields', async () => {
      const res = await apiCreateCoordination({
        coordination: 'worng words',
        whatAreWeDoing: 'nothing',
        introToHighlights: 'there isnt',
        highlight: 'test',
      });
      expect(res.status).toBe(400);
      expect(res.body.errors).toEqual([
        'Coordination information must be twenty(20)  characters minimum',
        'What are we doing must be twenty(20)  characters minimum',
        'Introduction to Highlights must be twenty(20)  characters minimum',
      ]);
    });

    it('expect to not create Coordination with empty fields', async () => {
      const res = await apiCreateCoordination({});
      expect(res.status).toBe(400);
      expect(res.body.errors).toEqual([
        'Coordination information is required',
        'What are we doing information is required',
        'Introduction to Highlights is required',
      ]);
    });
  });

  describe('update coordination', () => {
    let existingCoordination;
    let newData;

    before(async () => {
      await removeAllModels(Coordination);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.update']);
      existingCoordination = await createCoordination();
      newData = await makeCoordination();
    });

    it('expect to update Coordination by id', async () => {
      const updated = (await apiUpdateCoordination(
        existingCoordination._id,
        newData,
      )).body.item;

      expect(updated).toMatchObject({
        coordination: newData.coordination,
        whatAreWeDoing: newData.whatAreWeDoing,
        introToHighlights: newData.introToHighlights,
      });
    });

    it('should update with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect(
        (await apiUpdateCoordination(existingCoordination._id, newData)).status,
      ).toBe(200);
      await app.loginRandom(['cms.update']);
      expect(
        (await apiUpdateCoordination(existingCoordination._id, newData)).status,
      ).toBe(200);
      await app.loginRandom(['cms.*']);
      expect(
        (await apiUpdateCoordination(existingCoordination._id, newData)).status,
      ).toBe(200);
    });

    it('expect to not update Coordination with an invalid id', async () => {
      const res = await apiUpdateCoordination('899jkdhkj9790', newData);
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiGetCoordination(existingCoordination._id);
      expect(res.status).toBe(403);
    });
  });

  describe('get coordination', () => {
    let existingCoordination;

    beforeEach(async () => {
      await removeAllModels(Coordination);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.view']);
      existingCoordination = await createCoordination();
    });

    it('expect to get Coordination by id', async () => {
      const res = await apiGetCoordination(existingCoordination._id);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        coordination: existingCoordination.coordination,
        whatAreWeDoing: existingCoordination.whatAreWeDoing,
        introToHighlights: existingCoordination.introToHighlights,
      });
    });

    it('should retrieve with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiGetCoordination(existingCoordination._id)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.view']);
      expect((await apiGetCoordination(existingCoordination._id)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.*']);
      expect((await apiGetCoordination(existingCoordination._id)).status).toBe(
        200,
      );
    });

    it('expect to not retrieve Coordination with an invalid id', async () => {
      const res = await apiGetCoordination('76jkhdh868');
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });
  });

  describe('list coordination', () => {
    beforeEach(async () => {
      await removeAllModels(Coordination);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.view']);
      await Promise.all([...Array(5)].map(() => createCoordination()));
    });

    it('expect to retrieve the list of Coordinations', async () => {
      const coordination = await Coordination.model.find({});
      const res = await apiListCoordination();
      expect(res.status).toBe(200);
      for (let i = 0; i < 5; i += 1) {
        expect(res.body.items[i]).toMatchObject({
          coordination: coordination[i].coordination,
          whatAreWeDoing: coordination[i].whatAreWeDoing,
          introToHighlights: coordination[i].introToHighlights,
        });
      }
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiListCoordination();
      expect(res.status).toBe(403);
    });
  });

  describe('archive coordination', () => {
    let existingCoordination;

    beforeEach(async () => {
      await removeAllModels(Coordination);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.archive']);
      existingCoordination = await createCoordination();
    });

    it('expect to archive coordinations by id', async () => {
      const res = await apiArchiveCoordination(existingCoordination._id);
      expect(res.status).toBe(200);
      expect(res.body.item.archived).toEqual(true);
    });

    it('should archive with full full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect(
        (await apiArchiveCoordination(existingCoordination._id)).status,
      ).toBe(200);
      await app.loginRandom(['cms.archive']);
      expect(
        (await apiArchiveCoordination(existingCoordination._id)).status,
      ).toBe(200);
      await app.loginRandom(['cms.*']);
      expect(
        (await apiArchiveCoordination(existingCoordination._id)).status,
      ).toBe(200);
    });

    it('expect to not archive coordinations with an invalid id', async () => {
      const res = await apiArchiveCoordination('89787sjhkf98379');
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiArchiveCoordination(existingCoordination._id);
      expect(res.status).toBe(403);
    });
  });
});
