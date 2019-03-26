import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createFunding } from '../../../helpers/dropdowns/funding';
import { createReturneeService } from '../../../helpers/dropdowns/returnServices';

const SourceOfFunding = keystone.list('SourceOfFunding');

const { expect } = chai;

const route = '/api/v1/funding-source';
const routeWithId = (id) => `${route}/${id}`;
const deleteRoute = routeWithId;
const updateRoute = routeWithId;
let source;

describe('State route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(SourceOfFunding);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      source = await createFunding();
    });

    it('should return a 400 status when sourceOfFundingName is not provided', async () => {
      const res = await app
        .post(route)
        .send({ data: [{ description: 'name' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid sourceOfFundingName and description is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            sourceOfFundingName: source.sourceName + faker.random.uuid(),
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
      source = await createFunding();
    });

    it('should get all funding sources', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      source = await createFunding();
    });

    it('should delete a source of funding', async () => {
      const source = await createFunding();
      const { _id: id } = source;
      let res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');

      res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });

    it('should return a 404  if id passed doesnot exist', async () => {
      const id = '5c9b27e320bed68318c5396d';
      await createReturneeService(id);
      const res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
  });

  describe(`PUT request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.update']);
    });

    it('should update a funding source', async () => {
      const sourceName = 'new name';
      const source = await createFunding();
      const { _id: id } = source;
      const res = await app.put(updateRoute(id)).send({ sourceName });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });
});
