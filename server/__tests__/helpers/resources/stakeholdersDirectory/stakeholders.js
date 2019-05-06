import keystone from 'keystone';
import { faker, removeAllCollections } from '../../commons/base';
import { createOrganisationType } from '../../dropdowns/organizationTypes';
import { createStatus } from '../../dropdowns/status';
import { createImpactType } from '../../dropdowns/impactType';
import { createStaffStrength } from '../../dropdowns/staffStrength';

const StakeholdersModel = keystone.list('Stakeholder');

export const createStaholders = async (times = 1) => {
  const temp = new Array(times);
  temp.fill(1);
  let stakeholders = [];
  let organisationType = '';
  await createOrganisationType().then((res) => {
    organisationType = res._id;
  });
  let regStatus = '';
  await createStatus().then((res) => {
    regStatus = res._id;
  });
  let impactType = '';
  await createImpactType().then((res) => {
    impactType = res._id;
  });
  let staffStrength = '';
  await createStaffStrength().then((res) => {
    staffStrength = res._id;
  });
  await Promise.all(
    temp.map(() =>
      StakeholdersModel.model.create({
        organisationName: faker.random.uuid(),
        organisationTypeId: organisationType,
        registrationStatusId: regStatus,
        impactTypeId: impactType,
        founder: faker.random.words(1),
        phoneNumber: faker.random.number(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        description: faker.random.words(3),
        staffStrengthRangeId: staffStrength._id,
        edoStateOperationStartYear: faker.random.words(1),
        yearOfCacREG: faker.random.words(1),
        cacRcNumber: faker.random.words(1),
        volunteersCount: faker.random.number(),
        localManagerName: faker.random.words(2),
        localManagerEmail: faker.internet.email(),
        localManagerMobile: faker.random.number(),
        partnerWithGovernment: faker.random.boolean(),
        challenges: faker.random.words(2),
        assistanceRequired: faker.random.words(2),
        locality: 'International',
        notes: faker.random.words(12),
        phoneNumber1: faker.random.number(),
        phoneNumber2: faker.random.number(),
        phoneNumber3: faker.random.number(),
      }),
    ),
  ).then((docs) => {
    stakeholders = docs;
  });
  return times === 1 ? stakeholders[0] : stakeholders;
};

export const removeAllStakeholders = async () => {
  const amountInvested = keystone.list('AmountInvestedRange');
  const StaffStrengthRange = keystone.list('StaffStrengthRange');
  const ImpactType = keystone.list('ImpactType');
  const RegistrationStatus = keystone.list('RegistrationStatus');
  const OrganisationType = keystone.list('OrganisationType');
  const models = [
    amountInvested,
    StaffStrengthRange,
    ImpactType,
    RegistrationStatus,
    OrganisationType,
    StakeholdersModel,
  ];
  await Promise.all(models.map((model) => removeAllCollections(model)));
};
