import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createWard } from '../../../helpers/dropdowns/ward';

const Ward = keystone.list('Ward');

const { expect } = chai;

const route = '/api/v1/ward';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;
let ward;

describe('Ward route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(Ward);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      ward = await createWard();
    });

    it('should return a 400 status when lgaId or wardName is not provided', async () => {
      const res = await app.post(route).send({ data: [{ wardName: 'name' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid wardName and lgaId is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            wardName: ward.wardName + faker.random.uuid(),
            lgaId: ward.lgaId,
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
      ward = await createWard();
    });

    it('should get all wards', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`GET request to ${route}/:lga_id`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      ward = await createWard();
    });

    it('should get all wards by lgaId', async () => {
      const res = await app.get(`${route}/${ward.lgaId}`);
      expect(res.status).to.equal(200);
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      ward = await createWard();
    });

    it('should delete a ward', async () => {
      const ward = await createWard();
      const { _id: id } = ward;
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

    it('should update a ward', async () => {
      const wardName = 'Edited state name';
      const ward = await createWard();
      const { _id: id } = ward;
      const res = await app.put(updateRoute(id)).send({ wardName });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('ward');
      expect(res.body.data.ward.wardName).to.equal(wardName);
    });
  });
});
