import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import { createImpactType } from '../../../helpers/dropdowns/impactType';

const State = keystone.list('State');

const { expect } = chai;

const route = '/api/v1/impact-type';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;

describe('Impact type route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(State);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      await createImpactType();
    });

    it('should return a 201 status when valid impact type name is passed', async () => {
      const res = await app.post(route).send({
        data: [
          {
            impactTypeName: 'Direct',
            description: 'random data',
          },
        ],
      });
      expect(res.status).to.equal(201);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
  });

  describe(`GET ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      await createImpactType();
    });

    it('should return all states', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      await createImpactType();
    });

    it('should delete a an impact type', async () => {
      const state = await createImpactType();
      const { _id: id } = state;
      let res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');

      res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
  });

  describe(`PUT request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.update']);
    });

    it('should update a impact Type', async () => {
      const state = await createImpactType();
      await app.post(route).send({
        data: [
          {
            impactTypeName: 'Direct',
            description: 'random data',
          },
        ],
      });
      const { _id: id } = state;
      const res = await app.put(updateRoute(id)).send({
        data: [
          {
            impactTypeName: 'Indirect',
            description: 'random data',
          },
        ],
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
    });
  });
});
