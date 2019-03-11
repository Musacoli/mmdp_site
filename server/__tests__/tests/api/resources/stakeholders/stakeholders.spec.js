import expect from 'expect';
import { app, removeAllGroupsAndUsers } from '../../../../helpers/commons/base';
import Stakeholder from '../../../../../models/resources/stakeholdersDirectory/Stakeholders';

const route = '/api/v1/stakeholders-directory';

describe('create stakeholders', () => {
  const testData = {
    organisationName: 'organisation12',
  };

  beforeEach(async () => {
    await Stakeholder.model.remove({});
    await removeAllGroupsAndUsers();
    await app.loginRandom(['cms.stakeholder.create']);
  });

  it('should add a new stakeholder', async () => {
    const res = await app.post(`${route}`).send(testData);
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
  });

  it('should edit an existing stakeholder ', async () => {
    const res = await app.post(`${route}`).send(testData);
    const id = res.body.data[0]._id;
    const testData2 = {
      organisationName: '2',
    };
    await app.loginRandom(['cms.stakeholder.update']);
    const res2 = await app.put(`${route}/${id}`).send(testData2);
    expect(res2.body.message).toBe('successfully updated');
    expect(res2.body.stakeholder.organisationName).toBe(
      testData2.organisationName,
    );
  });
  it('should not edit an non-existent stakeholder ', async () => {
    const id = 'arndomid thatdoesnotexist';
    await app.loginRandom(['cms.stakeholder.update']);
    const res2 = await app.put(`${route}/${id}`).send(testData);
    expect(res2.body.message).toBe('The specified stakeholder was not found');
  });

  it('should delete an existing stakeholder ', async () => {
    const res = await app.post(`${route}`).send(testData);
    const id = res.body.data[0]._id;
    const testData2 = {
      organisationName: '2',
    };
    await app.loginRandom(['cms.stakeholder.delete']);
    const res2 = await app.delete(`${route}/${id}`).send(testData2);
    expect(res2.body.message).toBe('successfully deleted record');
  });

  it('should not delete an non-existent stakeholder ', async () => {
    const res = await app.post(`${route}`).send(testData);
    const id = res.body.data[0]._id;
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
    const res = await app.get(`${route}?organisationName=12`);
    expect(res.body.data.length).toBe(1);
  });
});
