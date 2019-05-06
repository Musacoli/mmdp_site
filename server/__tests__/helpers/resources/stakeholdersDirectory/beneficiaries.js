import keystone from 'keystone';
import { faker, removeAllCollections } from '../../commons/base';
import { createStaholders } from './stakeholders';
import { createFunding } from '../../dropdowns/funding';
import { createAmountInvested } from '../../dropdowns/amountInvested';
import { createFocusArea } from '../../dropdowns/focusArea';
import { createBeneficiaryType } from '../../dropdowns/beneficiaryType';
import { createFrequency } from '../../dropdowns/frequency';
import { createTargetAudience } from '../../dropdowns/targetAudience';

const ReturneeServicesModel = keystone.list('ReturneeService');

export const createReturneeServices = async (times = 1) => {
  const temp = new Array(times);
  temp.fill(1);
  let services = [];
  let stakeholder = '';
  await createStaholders().then((res) => {
    stakeholder = res._id;
  });
  let funding = '';
  await createFunding().then((res) => {
    funding = res._id;
  });
  let investmentRange = '';
  await createAmountInvested().then((res) => {
    investmentRange = res._id;
  });
  let focusArea = '';
  await createFocusArea().then((res) => {
    focusArea = res._id;
  });
  let beneficiaryTypeId = '';
  await createBeneficiaryType().then((res) => {
    beneficiaryTypeId = res._id;
  });
  let frequency = '';
  await createFrequency().then((res) => {
    frequency = res._id;
  });
  let targetAudienceId = '';
  await createTargetAudience().then((res) => {
    targetAudienceId = res._id;
  });
  await Promise.all(
    temp.map(() =>
      ReturneeServicesModel.model.create({
        serviceName: faker.random.uuid(),
        stakeholderId: stakeholder,
        sourceOfFundingId: funding,
        averageNumberOfMaleBeneficiaries: faker.random.number(),
        averageNumberOfFemaleBeneficiaries: faker.random.number(),
        averageNumberOfBeneficiary: faker.random.number(),
        averageNumberOfBeneficiariesPerService: faker.random.number(),
        totalNumberOfBeneficiaries: faker.random.number(),
        amountInvestedRange: investmentRange,
        focusArea,
        duration: faker.random.number(),
        note: faker.random.words(3),
        comment: faker.random.words(3),
        meansOfAwareness: faker.random.words(3),
        beneficiaryTypeId,
        frequency,
        targetAudienceId,
        serviceStatus: 'Ongoing',
      }),
    ),
  ).then((res) => {
    services = res;
  });
  return times === 1 ? services[0] : services;
};

export const removeAllBeneficiaryServices = async () => {
  const TargetAudience = keystone.list('TargetAudience');
  const Frequency = keystone.list('Frequency');
  const BeneficiaryType = keystone.list('BeneficiaryType');
  const FocusArea = keystone.list('FocusArea');
  const amountInvested = keystone.list('AmountInvestedRange');
  const SourceOfFunding = keystone.list('SourceOfFunding');
  const StakeholdersModel = keystone.list('Stakeholder');
  const models = [
    TargetAudience,
    Frequency,
    BeneficiaryType,
    FocusArea,
    amountInvested,
    SourceOfFunding,
    StakeholdersModel,
    ReturneeServicesModel,
  ];
  await Promise.all(models.map((model) => removeAllCollections(model)));
};
