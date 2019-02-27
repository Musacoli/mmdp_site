import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../helpers/commons/base';

const BeneficiaryServiceCommunity = keystone.list(
  'BeneficiaryServiceCommunity',
);

const { expect } = chai;

const route = '/api/v1/ActiveStates/';

describe('Active States route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(BeneficiaryServiceCommunity);
  });

  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom([]);
    });

    it('should get all active states', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('states');
    });
  });
});
