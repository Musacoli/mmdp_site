import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createState } from '../../../helpers/dropdowns/state';
import { createLGA } from '../../../helpers/dropdowns/LGA';
import { createStakeholderAddress } from '../../../helpers/dropdowns/StakeholderAddress';

const State = keystone.list('State');

const { expect } = chai;

const route = '/api/v1/state';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;
let state;

describe('State route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(State);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      state = await createState();
    });

    it('should return a 400 status when countryId or stateName is not provided', async () => {
      const res = await app.post(route).send({ data: [{ stateName: 'name' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid stateName and countryId is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            stateName: state.stateName + faker.random.uuid(),
            countryId: state.countryId,
            description: 'sdfsdf',
          },
        ],
      });
      expect(res.status).to.equal(201);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });
  });

  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      state = await createState();
    });

    it('should get all states', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`GET request to ${route}/:country_id`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      state = await createState();
    });

    it('should get all states by countryId', async () => {
      const res = await app.get(`${route}/${state.countryId}`);
      expect(res.status).to.equal(200);
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      state = await createState();
    });

    it('should delete a state', async () => {
      const state = await createState();
      const { _id: id } = state;
      let res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');

      res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });

    it('should not delete a state with LGA assigned to it', async () => {
      const state = await createState();
      const { _id: id } = state;
      await createLGA(id);
      const res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal(
        'You cannot delete this state. It is already assigned to 1  Local governement(s)',
      );
      expect(res.body).to.have.property('message');
    });

    it('should not delete a state with stakeholder address assigned to it', async () => {
      const state = await createState();
      const { _id: id } = state;
      await createStakeholderAddress(id);
      const res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal(
        'You cannot delete this state. It is already assigned to 1 stakeholder(s) ',
      );
      expect(res.body).to.have.property('message');
    });
  });

  describe(`PUT request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.update']);
    });

    it('should update a state', async () => {
      const stateName = 'Edited state name';
      const state = await createState();
      const { _id: id } = state;
      const res = await app.put(updateRoute(id)).send({ stateName });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('state');
      expect(res.body.data.state.stateName).to.equal(stateName);
    });
  });
});
