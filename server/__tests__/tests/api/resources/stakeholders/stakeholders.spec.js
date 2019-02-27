import expect from 'expect';
import { app, removeAllGroupsAndUsers } from '../../../../helpers/commons/base';
import Stakeholder from '../../../../../models/resources/stakeholdersDirectory/Stakeholders';
import {
  getBeneficiaryData,
  getStakeholderData,
} from '../../../../helpers/resources/stakeholdersDirectory/stakeholderData';
import { removeAllStakeholders } from '../../../../helpers/resources/stakeholdersDirectory/stakeholders';
import { removeAllBeneficiaryServices } from '../../../../helpers/resources/stakeholdersDirectory/beneficiaries';
import { removeAllReturneeServiceCommunities } from '../../../../helpers/resources/stakeholdersDirectory/beneficiaryServiceCommunities';

const route = '/api/v1/stakeholders-directory';

describe('create stakeholders', () => {
  let testData;
  let staleStakeholderId = '';

  beforeEach(async () => {
    await Stakeholder.model.remove({});
    await removeAllGroupsAndUsers();
    await removeAllStakeholders();
    await removeAllBeneficiaryServices();
    await removeAllReturneeServiceCommunities();
    await app.loginRandom(['cms.stakeholder.create']);
    testData = await getStakeholderData();
    testData.beneficiaries = [await getBeneficiaryData()];
  });

  it('should add a new stakeholder', async () => {
    console.info(testData);
    const res = await app.post(`${route}`).send(testData);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('New stakeholder Added');
  });

  it('should edit an existing stakeholder ', async () => {
    const res = await app.post(`${route}`).send(testData);
    const id = res.body.result.Stakeholder._id;
    staleStakeholderId = id;
    const testData2 = {
      organisationName: '2',
    };
    await app.loginRandom(['cms.stakeholder.update']);
    const res2 = await app.put(`${route}/${id}`).send(testData2);
    expect(res2.body.message).toBe('Stakeholder Modified');
  });
  it('should not edit an non-existent stakeholder ', async () => {
    await app.loginRandom(['cms.stakeholder.update']);
    const res2 = await app.put(`${route}/${staleStakeholderId}`).send(testData);
    expect(res2.body.error).toBe('stakeholder not found or removed');
  });

  it('should delete an existing stakeholder ', async () => {
    const res = await app.post(`${route}`).send(testData);
    const id = res.body.result.Stakeholder._id;
    const testData2 = {
      organisationName: '2',
    };
    await app.loginRandom(['cms.stakeholder.delete']);
    const res2 = await app.delete(`${route}/${id}`).send(testData2);
    expect(res2.body.message).toBe('successfully deleted record');
  });

  it('should not delete an non-existent stakeholder ', async () => {
    const id = staleStakeholderId;
    const testData2 = {
      organisationName: '2',
    };
    await app.loginRandom(['cms.stakeholder.delete']);
    await app.delete(`${route}/${id}`).send(testData2);
    const res3 = await app.delete(`${route}/${id}`).send(testData2);
    expect(res3.body.message).toBe('The specified stakeholder was not found');
  });
  it('should search for all stakeholders', async () => {
    const res = await app.get(`${route}?Organisation_Name=`);
    expect(res.body.data.length).toBe(0);
  });

  it('should search for a specific stakeholders', async () => {
    await app.post(`${route}`).send(testData);
    const res = await app.get(
      `${route}?organisationName=${testData.organisationName}`,
    );
    expect(res.body.data.length).toBe(1);
  });
});
