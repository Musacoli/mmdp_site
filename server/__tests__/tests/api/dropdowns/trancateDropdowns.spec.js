import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import { createState } from '../../../helpers/dropdowns/state';
import { createLGA } from '../../../helpers/dropdowns/LGA';

const State = keystone.list('State');

const { expect } = chai;

const route = '/api/v1/truncate/state';

describe('Trancate route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(State);
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
    });

    it('should trancate a dropdown', async () => {
      const res = await app.delete(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
    });

    it('should not trancate a state with LGA assigned to it', async () => {
      const state = await createState();

      const { _id: id } = state;
      await createLGA(id);
      const res = await app.delete(route);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.be.a('string');
      expect(res.body).to.have.property('message');
    });
  });
});
