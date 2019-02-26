/* eslint-disable no-underscore-dangle */
import expect from 'expect';
import { app, removeAllGroupsAndUsers } from '../../helpers/commons/base';
import StakeholdersDirectory from '../../../models/stakeholdersDirectory';
import BasicInformation from '../../../models/stakeholdersDirectory/BasicInformation';
import BeneficiaryService from '../../../models/stakeholdersDirectory/BeneficiaryService';
import {
  createStakeholdersDirectory,
  makeBasicInformation,
  makeBeneficiaryService,
} from '../../helpers/stakeholdersDirectory';

const stakeholdersPath = '/api/v1/stakeholders-directory';

const data = {
  basicInformation: makeBasicInformation(),
  beneficiaryService: [makeBeneficiaryService()],
};

const apiCreateStakeholdersDirectory = (payload) =>
  app.post(`${stakeholdersPath}/create`).send(payload);

const apiUpdateStakeholdersDirectory = (id, payload) =>
  app.put(`${stakeholdersPath}/${id}/update`).send(payload);

const apiGetStakeholdersDirectory = (id) =>
  app.get(`${stakeholdersPath}/${id}`).send();

const apiListStakeholdersDirectory = () =>
  app.get(`${stakeholdersPath}/list`).send();

const apiDeleteStakeholdersDirectory = (id) =>
  app.delete(`${stakeholdersPath}/${id}/remove`).send();

describe('StakeholdersDirectory API', () => {
  describe('create stakeholder', () => {
    before(async () => {
      await StakeholdersDirectory.model.remove({});
      await BeneficiaryService.model.remove({});
      await BasicInformation.model.remove({});
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.stakeholder.create']);
    });

    it('expect to create StakeholdersDirectory', async () => {
      const res = await apiCreateStakeholdersDirectory(data);
      expect(res.status).toBe(201);
      expect(res.body.data.basicInformation.stakeholderName).toEqual(
        data.basicInformation.stakeholderName,
      );
      expect(res.body.data.beneficiaryService[0].serviceName).toEqual(
        data.beneficiaryService[0].serviceName,
      );
    });

    it('should create with full stakeholder or cms permissions', async () => {
      await app.loginRandom(['cms.stakeholder.*']);
      expect((await apiCreateStakeholdersDirectory(data)).status).toBe(201);
      await app.loginRandom(['cms.create']);
      expect((await apiCreateStakeholdersDirectory(data)).status).toBe(201);
      await app.loginRandom(['cms.*']);
      expect((await apiCreateStakeholdersDirectory(data)).status).toBe(201);
    });

    it('expect to not create StakeholdersDirectory with invalid fields', async () => {
      const res = await apiCreateStakeholdersDirectory({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual([
        '"Basic Information" is required',
        '"Beneficiary Service" is required',
      ]);
    });

    it('expect to not create StakeholdersDirectory with empty fields', async () => {
      const res = await apiCreateStakeholdersDirectory({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual([
        '"Basic Information" is required',
        '"Beneficiary Service" is required',
      ]);
    });
  });

  describe('update stakeholder', () => {
    let existingStakeholdersDirectory;
    const newData = {
      basicInformation: makeBasicInformation(),
      beneficiaryService: [makeBeneficiaryService(), makeBeneficiaryService()],
    };

    before(async () => {
      await StakeholdersDirectory.model.remove({});
      await BeneficiaryService.model.remove({});
      await BasicInformation.model.remove({});
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.stakeholder.update']);
      existingStakeholdersDirectory = await createStakeholdersDirectory();
    });

    it('expect to update StakeholdersDirectory by id', async () => {
      const updated = (await apiUpdateStakeholdersDirectory(
        existingStakeholdersDirectory._id,
        newData,
      )).body.data;
      expect(updated.basicInformation.stakeholderName).toEqual(
        newData.basicInformation.stakeholderName,
      );
      expect(updated.beneficiaryService[0].serviceName).toEqual(
        newData.beneficiaryService[0].serviceName,
      );
    });

    it('should update with full stakeholder or cms permission', async () => {
      await app.loginRandom(['cms.stakeholder.*']);
      expect(
        (await apiUpdateStakeholdersDirectory(
          existingStakeholdersDirectory._id,
          newData,
        )).status,
      ).toBe(200);
      await app.loginRandom(['cms.update']);
      expect(
        (await apiUpdateStakeholdersDirectory(
          existingStakeholdersDirectory._id,
          newData,
        )).status,
      ).toBe(200);
      await app.loginRandom(['cms.*']);
      expect(
        (await apiUpdateStakeholdersDirectory(
          existingStakeholdersDirectory._id,
          newData,
        )).status,
      ).toBe(200);
    });

    it('expect to not update StakeholdersDirectory with an invalid id', async () => {
      const res = await apiUpdateStakeholdersDirectory(
        '899jkdhkj9790',
        newData,
      );
      expect(res.status).toBe(500);
      expect(res.body.status).toEqual('error');
    });

    it('expect to not update StakeholdersDirectory with an invalid id', async () => {
      const res = await apiUpdateStakeholdersDirectory(
        '5c5d8bdaceab82f28c547a1b',
        newData,
      );
      expect(res.status).toBe(404);
      expect(res.body.status).toEqual('fail');
    });

    it('should fail if user is not authorized', async () => {
      await app.loginRandom([]);
      const res = await apiGetStakeholdersDirectory(
        existingStakeholdersDirectory._id,
      );
      expect(res.status).toBe(403);
    });
  });

  describe('get stakeholder', () => {
    let existingStakeholdersDirectory;

    beforeEach(async () => {
      await StakeholdersDirectory.model.remove({});
      await BeneficiaryService.model.remove({});
      await BasicInformation.model.remove({});
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.stakeholder.view']);
      existingStakeholdersDirectory = await createStakeholdersDirectory();
    });

    it('expect to get StakeholdersDirectory by id', async () => {
      const res = await apiGetStakeholdersDirectory(
        existingStakeholdersDirectory._id,
      );
      expect(res.status).toBe(200);
    });

    it('should retrieve with full stakeholder or cms permission', async () => {
      await app.loginRandom(['cms.stakeholder.*']);
      expect(
        (await apiGetStakeholdersDirectory(existingStakeholdersDirectory._id))
          .status,
      ).toBe(200);
      await app.loginRandom(['cms.view']);
      expect(
        (await apiGetStakeholdersDirectory(existingStakeholdersDirectory._id))
          .status,
      ).toBe(200);
      await app.loginRandom(['cms.*']);
      expect(
        (await apiGetStakeholdersDirectory(existingStakeholdersDirectory._id))
          .status,
      ).toBe(200);
    });

    it('expect to not retrieve StakeholdersDirectory with an invalid id', async () => {
      const res = await apiGetStakeholdersDirectory('76jkhdh868');
      expect(res.status).toBe(500);
      expect(res.body.status).toEqual('error');
    });

    it('expect to not retrieve StakeholdersDirectory with an invalid id', async () => {
      const res = await apiGetStakeholdersDirectory('5c5d8bdaceab82f28c547a1b');
      expect(res.status).toBe(404);
      expect(res.body.status).toEqual('fail');
    });
  });

  describe('list stakeholder', () => {
    beforeEach(async () => {
      await StakeholdersDirectory.model.remove({});
      await BeneficiaryService.model.remove({});
      await BasicInformation.model.remove({});
      await removeAllGroupsAndUsers();
      await app.loginRandom([]);
      await createStakeholdersDirectory();
    });

    it('expect to retrieve the list of StakeholdersDirectory list', async () => {
      const res = await apiListStakeholdersDirectory();
      expect(res.status).toBe(200);
    });

    it('should allow guests to retrieve StakeholdersDirectory list', async () => {
      await app.logout();
      const res = await apiListStakeholdersDirectory();
      expect(res.status).toBe(200);
    });
  });

  describe('delete stakeholder', () => {
    let existingStakeholdersDirectory;

    beforeEach(async () => {
      await StakeholdersDirectory.model.remove({});
      await BeneficiaryService.model.remove({});
      await BasicInformation.model.remove({});
      await removeAllGroupsAndUsers();
      await app.loginRandom(['cms.stakeholder.delete']);
      existingStakeholdersDirectory = await createStakeholdersDirectory();
    });

    it('expect to delete StakeholdersDirectory by id', async () => {
      const res = await apiDeleteStakeholdersDirectory(
        existingStakeholdersDirectory._id,
      );
      expect(res.status).toBe(204);
    });

    it('should retrieve with full stakeholder or cms permission', async () => {
      await app.loginRandom(['cms.stakeholder.*']);
      expect(
        (await apiDeleteStakeholdersDirectory(
          existingStakeholdersDirectory._id,
        )).status,
      ).toBe(204);
      await app.loginRandom(['cms.delete']);
      expect(
        (await apiDeleteStakeholdersDirectory(
          existingStakeholdersDirectory._id,
        )).status,
      ).toBe(404);
      await app.loginRandom(['cms.*']);
      expect(
        (await apiDeleteStakeholdersDirectory(
          existingStakeholdersDirectory._id,
        )).status,
      ).toBe(404);
    });

    it('expect to not retrieve StakeholdersDirectory with an invalid id', async () => {
      const res = await apiDeleteStakeholdersDirectory('76jkhdh868');
      expect(res.status).toBe(500);
      expect(res.body.status).toEqual('error');
    });

    it('expect to not retrieve StakeholdersDirectory with an invalid id', async () => {
      const res = await apiDeleteStakeholdersDirectory(
        '5c5d8bdaceab82f28c547a1b',
      );
      expect(res.status).toBe(404);
      expect(res.body.status).toEqual('fail');
    });
  });
});
