import chai from 'chai';
import { app, removeAllGroupsAndUsers } from '../../../helpers/commons/base';

const { expect } = chai;

const route = '/api/v1/dropdowns-list';

describe('Dropdowns route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
  });

  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
    });

    it('should get all dropdowns', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });
});
