import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import { createState } from '../../../helpers/dropdowns/state';
import { createLGA } from '../../../helpers/dropdowns/LGA';

const { expect } = chai;

const State = keystone.list('State');
const route = '/api/v1/dropdowns/LGA';

describe('LGA Backend Endpoints', () => {
  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await removeAllGroupsAndUsers();
      await removeAllCollections(State);
    });

    it('Should return 201 when LGA(s) is/are created', async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      const state = await createState();
      const res = await app.post(route).send({
        data: [
          { lgaName: 'name', stateId: state._id, description: 'description' },
        ],
      });
      expect(res.status).to.equal(201);
    });

    it('It should return 403 for unauthorized users', async () => {
      await app.loginRandom(['']);
      const state = await createState();
      const res = await app.post(route).send({
        data: [
          { lgaName: 'name', stateId: state._id, description: 'description' },
        ],
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

    it('It should return All LGAs', async () => {
      await app.loginRandom(['cms.dropdowns.view']);
      const res = await app.get(route);
      expect(res.status).to.equal(200);
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
    });

    it('should delete a Local Government Area', async () => {
      const LGAItem = await createLGA();
      const res = await app.delete(`${route}/${LGAItem._id}`);
      expect(res.status).to.equal(202);
    });

    it('should Return a 404 for an Invalid Id', async () => {
      const res = await app.delete(`${route}/34567890eerdd90328`);
      expect(res.status).to.equal(404);
    });

    it('It should return 403 for unauthorized users', async () => {
      await app.loginRandom(['']);
      const LGAItem = await createLGA();
      const res = await app.delete(`${route}/${LGAItem._id}`);
      expect(res.status).to.equal(403);
    });
  });

  describe(`PUT request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.update']);
    });

    it('should update Local Government Area(s)', async () => {
      const newName = 'New Local Government Area';
      const state = await createState();
      const LGAItem = await createLGA();
      const res = await app.put(route).send({
        data: [{ lgaName: newName, _id: LGAItem._id, stateId: state._id }],
      });
      expect(res.status).to.equal(200);
    });
  });
});
