/* eslint-disable no-underscore-dangle */
import expect from 'expect';
import {
  app,
  removeAllGroupsAndUsers,
  removeAllCollections,
} from '../../../helpers/commons/base';
import GovernorMessage from '../../../../models/about/GovernorMessage';
import {
  makeGovernorMessage,
  createGovernorMessage,
} from '../../../helpers/about/governorMessage';

const governorMessagePath = '/api/v1/about/governor-message';

const data = {
  governorName: 'mr governor',
  governorMessage: 'this is a message from the governor',
};

const apiCreateGovernorMessage = async (payload) =>
  app.post(`${governorMessagePath}/create`).send(payload);

const apiUpdateGovernorMessage = async (id, payload) =>
  app.put(`${governorMessagePath}/${id}/update`).send(payload);

const apiGetGovernorMessage = async (id) =>
  app.get(`${governorMessagePath}/${id}`).send();

const apiListGovernorMessage = async () =>
  app.get(`${governorMessagePath}/list`).send();

describe('Governor Message API', () => {
  describe('create governor message', () => {
    beforeEach(async () => {
      await removeAllCollections(GovernorMessage);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.create']);
    });

    it('expect to create governor message', async () => {
      const res = await apiCreateGovernorMessage(data);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        governorName: data.governorName,
        governorMessage: data.governorMessage,
      });
    });

    it('should create with full about or cms permissions', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiCreateGovernorMessage(data)).status).toBe(200);
      await app.loginRandom(['cms.create']);
      expect((await apiCreateGovernorMessage(data)).status).toBe(200);
      await app.loginRandom(['cms.*']);
      expect((await apiCreateGovernorMessage(data)).status).toBe(200);
    });

    it('expect to not create governor message with an invalid fields', async () => {
      const res = await apiCreateGovernorMessage({
        governorMessage: 'message',
        governorName: 'n',
      });
      expect(res.body.errors).toEqual([
        'Governor name must be two(2)  characters minimum',
        'Governor message must be twenty(20)  characters minimum',
      ]);
    });

    it('expect to not create governor message with an empty field', async () => {
      const res = await apiCreateGovernorMessage({});
      expect(res.body.errors).toEqual([
        'Governor name is required',
        'Governor message is required',
      ]);
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiCreateGovernorMessage(data);
      expect(res.status).toBe(403);
    });
  });

  describe('update governor message', () => {
    let existingMessage;
    let newData;

    beforeEach(async () => {
      await removeAllCollections(GovernorMessage);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.update']);
      existingMessage = await createGovernorMessage();
      newData = makeGovernorMessage();
    });

    it('expect to update governor message by id', async () => {
      const updated = (await apiUpdateGovernorMessage(
        existingMessage._id,
        newData,
      )).body.item;
      expect(updated).toMatchObject(newData);
    });

    it('should update with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect(
        (await apiUpdateGovernorMessage(existingMessage._id, newData)).status,
      ).toBe(200);
      await app.loginRandom(['cms.update']);
      expect(
        (await apiUpdateGovernorMessage(existingMessage._id, newData)).status,
      ).toBe(200);
      await app.loginRandom(['cms.*']);
      expect(
        (await apiUpdateGovernorMessage(existingMessage._id, newData)).status,
      ).toBe(200);
    });

    it('expect to not update governor message with an invalid id', async () => {
      const res = await apiUpdateGovernorMessage('899jkdhkj9790', newData);
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiUpdateGovernorMessage(existingMessage._id, newData);
      expect(res.status).toBe(403);
    });
  });

  describe('get governor message', () => {
    let existingMessage;

    beforeEach(async () => {
      await removeAllCollections(GovernorMessage);
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.about.view']);
      existingMessage = await createGovernorMessage();
    });

    it('expect to get governor message by id', async () => {
      const res = await apiGetGovernorMessage(existingMessage._id);
      expect(res.status).toBe(200);
      expect(res.body.item).toMatchObject({
        governorName: existingMessage.governorName,
        governorMessage: existingMessage.governorMessage,
      });
    });

    it('should retrieve with full about or cms permission', async () => {
      await app.loginRandom(['cms.about.*']);
      expect((await apiGetGovernorMessage(existingMessage._id)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.view']);
      expect((await apiGetGovernorMessage(existingMessage._id)).status).toBe(
        200,
      );
      await app.loginRandom(['cms.*']);
      expect((await apiGetGovernorMessage(existingMessage._id)).status).toBe(
        200,
      );
    });

    it('expect to not retrieve governor message with an invalid id', async () => {
      const res = await apiGetGovernorMessage('76jkhdh868');
      expect(res.status).toBe(500);
      expect(res.body.error).toEqual('database error');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiGetGovernorMessage(existingMessage._id);
      expect(res.status).toBe(403);
    });
  });

  describe('list governor message', () => {
    beforeEach(async () => {
      await removeAllCollections(GovernorMessage);
      await Promise.all([...Array(5)].map(() => createGovernorMessage()));
    });

    it('expect to retrieve the list governor messages', async () => {
      const messages = await GovernorMessage.model.find({});
      const res = await apiListGovernorMessage();
      expect(res.status).toBe(200);
      for (let i = 0; i < 5; i += 1) {
        expect(res.body.items[i]).toMatchObject({
          governorName: messages[i].governorName,
          governorMessage: messages[i].governorMessage,
        });
      }
    });
  });
});
