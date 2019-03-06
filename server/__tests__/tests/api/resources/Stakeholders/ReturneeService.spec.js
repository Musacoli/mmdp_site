import expect from 'expect';
import { app, removeAllGroupsAndUsers } from '../../../../helpers/commons/base';
import BeneficiaryService from '../../../../../models/stakeholdersDirectory/ReturneeService';
import Stakeholder from '../../../../../models/stakeholdersDirectory/Stakeholders';

const route = '/api/v1/stakeholders-directory';

describe('Returnee service ', async () => {
  const testData = {
    organisationName: 'organisation12',
  };
  const testBeneficiary = {
    serviceName: 'Beneficiary',
  };

  beforeEach(async () => {
    await Stakeholder.model.remove({});
    await BeneficiaryService.model.remove({});
    await removeAllGroupsAndUsers();
    await app.loginRandom(['cms.stakeholder.create']);
  });

  it('should add a new stakeholder beneficiary', async () => {
    const res = await app.post(`${route}`).send(testData);
    const res2 = await app
      .post(`${route}/${res.body.data[0]._id}/beneficiaries`)
      .send(testBeneficiary);

    expect(res2.status).toBe(200);
    expect(res2.body.data.beneficiary.serviceName).toBe(
      testBeneficiary.serviceName,
    );
  });

  it('should not add beneficiary for a non existent user', async () => {
    const res2 = await app
      .post(`${route}/someidthatdoesnotexist/beneficiaries`)
      .send(testBeneficiary);
    expect(res2.body.error).toBe('Database Error');
    expect(res2.body.detail.name).toBe('CastError');
  });

  it('should list beneficiaries for a stakeholder', async () => {
    const res = await app.post(`${route}`).send(testData);
    await app
      .post(`${route}/${res.body.data[0]._id}/beneficiaries`)
      .send(testBeneficiary);
    const res3 = await app.get(
      `${route}/${res.body.data[0]._id}/beneficiaries`,
    );
    expect(res3.body.data.beneficiaries.length).toBe(1);
  });

  it('should edit an existing beneficiary', async () => {
    const res = await app.post(`${route}`).send(testData);
    const res2 = await app
      .post(`${route}/${res.body.data[0]._id}/beneficiaries`)
      .send(testBeneficiary);
    await app.loginRandom(['cms.stakeholder.update']);
    const res3 = await app
      .put(`${route}/${res2.body.data.beneficiary._id}/beneficiaries`)
      .send({ serviceName: 'Beneficiary2' });
    expect(res3.body.beneficiary.serviceName).toBe('Beneficiary2');
    expect(res3.status).toBe(200);
  });

  it('should delete an existing beneficiary', async () => {
    const res = await app.post(`${route}`).send(testData);
    const res2 = await app
      .post(`${route}/${res.body.data[0]._id}/beneficiaries`)
      .send(testBeneficiary);
    await app.loginRandom(['cms.stakeholder.delete']);
    const res3 = await app
      .delete(`${route}/${res2.body.data.beneficiary._id}/beneficiaries`)
      .send();
    expect(res3.body.message).toBe('successfully deleted record');
  });
});
