import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import { createStateMaps } from '../../../helpers/matrix/stateMap';

const CountryMap = keystone.list('CountryMap');

const { expect } = chai;
const route = '/api/v1/states';

describe('StateMap route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(CountryMap);
  });
  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom([]);
    });

    it('should get all stateMaps ', async () => {
      const state = await createStateMaps();
      const res = await app.get(
        `${route}?page=1&countryName=${state.countryName}&perPage=10`,
      );
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });
  describe(`PUT request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom([]);
    });
    it('should update state map', async () => {
      const stateMap = await createStateMaps();
      const res = await app
        .put(`${route}/${stateMap.uniqueId}`)
        .field('name', 'South');
      expect(res.status).to.equal(200);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
    it('should return 404 when updating non-existing map', async () => {
      const res = await app.put(`${route}/STL484`).field('name', 'Lagos west');
      expect(res.status).to.equal(404);
    });
  });
});
