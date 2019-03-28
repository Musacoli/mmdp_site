import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createBeneficiaryType } from '../../../helpers/dropdowns/beneficiaryType';

const BeneficiaryType = keystone.list('BeneficiaryType');

const { expect } = chai;

const route = '/api/v1/beneficiary-type';
const routeWithId = (id) => `${route}/${id}`;
const updateRoute = routeWithId;
const deleteRoute = routeWithId;
let type;

describe.only('Beneficiary type route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(BeneficiaryType);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      type = await createBeneficiaryType();
    });

    it('should return a 400 status when type name is not provided', async () => {
      const res = await app
        .post(route)
        .send({ data: [{ beneficiaryTypeName: '' }] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid type name is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            beneficiaryTypeName: type.beneficiaryTypeName + faker.random.uuid(),
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
      type = await createBeneficiaryType();
    });

    it('should get all types', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      type = await createBeneficiaryType();
    });

    it('should delete a beneficiary type', async () => {
      const type = await createBeneficiaryType();
      const { _id: id } = type;
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
      const beneficiaryTypeName = 'Edited registration status';
      const type = await createBeneficiaryType();
      const { _id: id } = type;
      const res = await app.put(updateRoute(id)).send({ beneficiaryTypeName });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.type.beneficiaryTypeName).to.equal(
        beneficiaryTypeName,
      );
    });
  });
});
