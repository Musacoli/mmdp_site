import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import { createOrganisationType } from '../../../helpers/dropdowns/organizationTypes';

const { expect } = chai;

const State = keystone.list('State');
const route = '/api/v1/organizationTypes';

describe('Organization Types Backend Endpoints', () => {
  describe(`POST request to ${route}`, () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await removeAllCollections(State);
    });

    it('Should return 201 when an Organization Type(s) is/are created', async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      const res = await app.post(route).send({
        data: [{ typeName: 'name', description: 'description' }],
      });
      expect(res.status).to.equal(201);
    });

    it('Should return 400 when an Organization Type(s) is/are missing', async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      const res = await app.post(route).send({
        data: [{ description: 'description' }],
      });
      expect(res.status).to.equal(400);
    });

    it('It should return 403 for unauthorized users', async () => {
      await app.loginRandom(['']);
      const res = await app.post(route).send({
        data: [{ typeName: 'name', description: 'description' }],
      });
      expect(res.status).to.equal(403);
    });
  });

  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
    });

    it('It should return 403 for unauthorized users', async () => {
      await app.loginRandom(['']);
      const res = await app.get(route);
      expect(res.status).to.equal(403);
    });

    it('It should return All s', async () => {
      await app.loginRandom(['cms.dropdowns.view']);
      const res = await app.get(route);
      expect(res.status).to.equal(200);
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
    });

    it('should delete an Organization Type', async () => {
      const Item = await createOrganisationType();
      const res = await app.delete(`${route}/${Item._id}`);
      expect(res.status).to.equal(202);
    });

    it('should Return a 404 for an Invalid Id', async () => {
      const res = await app.delete(`${route}/34567890eerdd90328`);
      expect(res.status).to.equal(404);
    });

    it('It should return 403 for unauthorized users', async () => {
      await app.loginRandom(['']);
      const Item = await createOrganisationType();
      const res = await app.delete(`${route}/${Item._id}`);
      expect(res.status).to.equal(403);
    });
  });

  describe(`PUT request`, () => {
    const newName = 'Organization Type Name';

    it('should update Organization Type(s)', async () => {
      await app.loginRandom(['cms.dropdowns.update']);
      const Item = await createOrganisationType();
      const res = await app.put(route).send({
        data: [{ typeName: newName, _id: Item._id }],
      });
      expect(res.status).to.equal(200);
    });

    it('Should return 400 when an Organization Type(s) is/are missing', async () => {
      await app.loginRandom(['cms.dropdowns.update']);
      const res = await app.put(route).send({
        data: [{ description: 'description' }],
      });
      expect(res.status).to.equal(400);
    });

    it('It should return 403 for unauthorized users', async () => {
      await app.loginRandom(['']);
      const Item = await createOrganisationType();
      const res = await app.put(route).send({
        data: [{ typeName: newName, _id: Item._id }],
      });
      expect(res.status).to.equal(403);
    });
  });
});
