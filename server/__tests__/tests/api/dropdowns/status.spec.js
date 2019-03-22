import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createStatus } from '../../../helpers/dropdowns/status';

const RegistrationStatus = keystone.list('RegistrationStatus');

const { expect } = chai;

const route = '/api/v1/registration-status';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;
let status;

describe('Status route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(RegistrationStatus);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      status = await createStatus();
    });

    it('should return a 400 status when registration status is not provided', async () => {
      const res = await app
        .post(route)
        .send({ data: [{ registrationStatus: '' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid registration status is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            registrationStatus: status.registrationStatus + faker.random.uuid(),
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
      status = await createStatus();
    });

    it('should get all registration statuses', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      status = await createStatus();
    });

    it('should delete a registration status', async () => {
      const status = await createStatus();
      const { _id: id } = status;
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
      const registrationStatus = 'Edited registration status';
      const status = await createStatus();
      const { _id: id } = status;
      const res = await app.put(updateRoute(id)).send({ registrationStatus });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.status.registrationStatus).to.equal(
        registrationStatus,
      );
    });
  });
});
