import keystone from 'keystone';
import chai from 'chai';
import {
  app,
  removeAllCollections,
  removeAllGroupsAndUsers,
  faker,
} from '../../../helpers/commons/base';
import { createPartnershipType } from '../../../helpers/dropdowns/partnershipType';
import { createStakeholderPartner } from '../../../helpers/dropdowns/StakeholderPartnership';

const PartnershipType = keystone.list('PartnershipType');

const { expect } = chai;

const route = '/api/v1/partnership-type';
const routeWithId = (id) => `${route}/${id}`;
const deleteRoute = routeWithId;
let partnerType;

describe('PartnershipType route', () => {
  beforeEach(async () => {
    await removeAllGroupsAndUsers();
    await removeAllCollections(PartnershipType);
  });

  describe(`POST ${route}`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.create']);
      partnerType = await createPartnershipType();
    });

    it('should return a 400 status when partnershipTypeName is not provided', async () => {
      const res = await app.post(route).send({ data: [{}] });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('data');
    });

    it('should return a 201 status when valid partnerTypeName and countryId is sent', async () => {
      const res = await app.post(route).send({
        data: [
          {
            partnershipTypeName:
              partnerType.partnershipTypeName + faker.random.uuid(),
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
      partnerType = await createPartnershipType();
    });

    it('should get all partnerTypes', async () => {
      const res = await app.get(route);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  describe(`DELETE request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.delete']);
      partnerType = await createPartnershipType();
    });

    it('should delete a partnerType', async () => {
      const partnerType = await createPartnershipType();
      const { _id: id } = partnerType;
      let res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');

      res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });

    it('should not delete a partnerType with stakeholder partnership assigned to it', async () => {
      const partnerType = await createPartnershipType();
      const { _id: id } = partnerType;
      await createStakeholderPartner(id);
      const res = await app.delete(deleteRoute(id));
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal(
        'You cannot delete this type. It is already assigned to 1  stakeholder partnership(s)',
      );
      expect(res.body).to.have.property('message');
    });
  });

  describe(`PUT request`, () => {
    beforeEach(async () => {
      await app.loginRandom(['cms.dropdowns.update']);
    });

    it('should update many partnerType', async () => {
      const partnershipTypeName = 'Edited partnerType name';
      const partnerType = await createPartnershipType();
      const { _id: id } = partnerType;
      const res = await app.put(`${route}`).send({
        data: [
          {
            _id: id,
            partnershipTypeName,
            description: 'sdfsdf',
          },
        ],
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal(
        '1 Partnership type(s) updated successfully',
      );
    });
  });
});
