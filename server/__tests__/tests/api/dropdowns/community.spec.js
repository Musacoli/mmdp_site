import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createCommunity } from '../../../helpers/dropdowns/communities';

const Community = keystone.list('Community');

const { expect } = chai;

const route = '/api/v1/community';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;
let community;

describe('Community route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(Community);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      community = await createCommunity();
    });

    it('should return a 400 status when wardId is not given', async () => {
      const res = await app
        .post(route)
        .send({ data: [{ communityName: 'name' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });
    it('should return a 201 status when valid data is given', async () => {
      const res = await app.post(route).send({
        data: [
          {
            communityName: `community${faker.random.uuid()}`,
            wardId: community.wardId,
            description: 'descriptions',
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
      community = await createCommunity();
    });

    it('should get all communities', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });
  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      community = await createCommunity();
    });

    it('should delete a community', async () => {
      const community = await createCommunity();
      const { _id: id } = community;
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

    it('should update a community', async () => {
      const communityName = 'new community name';
      const community = await createCommunity();
      const { _id: id } = community;
      const res = await app.put(updateRoute(id)).send({ communityName });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('community');
      expect(res.body.data.community.communityName).to.equal(communityName);
    });
  });
});
