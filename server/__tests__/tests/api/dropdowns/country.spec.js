import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createCountries } from '../../../helpers/dropdowns/country';

const Country = keystone.list('Country');

const { expect } = chai;

const route = '/api/v1/country';
const routeWithId = (id) => `${route}/${id}`;
const deleteRoute = routeWithId;
let status;

describe('Country route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(Country);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      status = await createCountries();
    });

    it('should return a 400 status when country Name is not provided', async () => {
      const res = await app.post(route).send({ data: [{ countryName: '' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid country name is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            countryName: status.registrationStatus + faker.random.uuid(),
            description: 'its working',
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
      status = await createCountries();
    });

    it('should get all countries ', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      status = await createCountries();
    });

    it('should delete a country ', async () => {
      const status = await createCountries();
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

    it('should update a country', async () => {
      const country = await createCountries();
      const res = await app.put(route).send({ data: [country] });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
    });
  });
});
