import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
} from '../../../helpers/commons/base';
import { createFrequency } from '../../../helpers/dropdowns/frequency';

const Frequency = keystone.list('Frequency');

const { expect } = chai;

const route = '/api/v1/frequency';
const routeWithId = (id) => `${route}/${id}`;
const deleteRoute = routeWithId;
const updateRoute = routeWithId;
// eslint-disable-next-line no-unused-vars
let source;

describe('Frequency route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(Frequency);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      source = await createFrequency();
    });

    it('should return a 400 status when frequencyValue is not provided', async () => {
      const res = await app
        .post(route)
        .send({ data: [{ classification: 'weekly' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid frequencyValue and classification is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            frequencyValue: 5,
            classification: 'weekly',
          },
        ],
      });
      expect(res.status).to.equal(201);
      expect(res.body).not.to.have.property('error');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
    });

    it('should fail if frequency is not a number', async () => {
      const res = await app.post(route).send({
        data: [
          {
            frequencyValue: 'new dataÏ',
            classification: 'weekly',
          },
        ],
      });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property('message');
    });
  });

  describe(`GET request to ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      source = await createFrequency();
    });

    it('should get all frequency options', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      source = await createFrequency();
    });

    it('should delete a frequency option', async () => {
      const source = await createFrequency();
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
      const res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
  });

  describe(`PUT request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.update']);
    });

    it('should update a frequency option', async () => {
      const sourceName = 'new name';
      const source = await createFrequency();
      const { _id: id } = source;
      const res = await app.put(updateRoute(id)).send({ sourceName });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });

    it('should throw a 500 server error if things go wrong', async () => {
      const res = await app.put(updateRoute()).send({});
      expect(res.status).to.equal(500);
    });
  });
});
