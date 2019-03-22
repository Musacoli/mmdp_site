import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createThematicPillarDropdown } from '../../../helpers/dropdowns/thematicPillars';

const State = keystone.list('ThematicPillarDropdown');

const { expect } = chai;

const route = '/api/v1/thematic-pillars';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;
let thematicPillars;

describe('ThematicPillars route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(State);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      thematicPillars = await createThematicPillarDropdown();
    });

    it('should return a 400 status when pillarTitle or description is not provided', async () => {
      const res = await app
        .post(route)
        .send({ data: { pillarTitle: '', description: '' } });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid pillarTitle and description is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            pillarTitle: thematicPillars.stateName + faker.random.uuid(),
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
      thematicPillars = await createThematicPillarDropdown();
    });

    it('should get all thematic pillars', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`GET request to ${route}/:id`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      thematicPillars = await createThematicPillarDropdown();
    });

    it('should get a thematic pillar by id', async () => {
      const res = await app.get(routeWithId(thematicPillars._id));
      expect(res.status).to.equal(200);
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      thematicPillars = await createThematicPillarDropdown();
    });

    it('should delete a thematic pillar', async () => {
      let res = await app.delete(deleteRoute(thematicPillars._id));
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');

      res = await app.delete(deleteRoute(thematicPillars._id));
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
  });

  describe(`PUT request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.update']);
    });

    it('should update a thematic pillar', async () => {
      const pillarTitle = 'Edited name';
      const thematicPillars = await createThematicPillarDropdown();
      const res = await app
        .put(updateRoute(thematicPillars._id))
        .send({ data: { pillarTitle } });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
    });

    it('should update many state', async () => {
      const thematicPillars = await createThematicPillarDropdown(2);
      await app.post(route).send({
        data: thematicPillars,
      });
      const res = await app.put(route).send({ data: thematicPillars });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
    });
  });
});
