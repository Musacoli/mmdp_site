import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import { createState } from '../../../helpers/dropdowns/state';
import State from '../../../../models/Dropdowns/State';

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
      const res = await app.post(route).send({});
      expect(res.status).to.equal(400);
      expect(res.body)
        .to.have.property('message')
        .be.a('String');
      expect(res.body.error).to.have.property('stateName');
    });

    it('should return a 201 status when valid stateName and countryId is sent', async () => {
      const res = await app.post(route).field('stateName', state.stateName);
      expect(res.status).to.equal(201);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
      expect(res.body.data.state).to.have.property('stateName');
      expect(res.body.data.state.stateName).to.equal(state.stateName);
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
      const res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(200);
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
