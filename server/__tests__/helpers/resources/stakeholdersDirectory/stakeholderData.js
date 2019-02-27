import Faker from 'faker';
import { createImpactType } from '../../dropdowns/impactType';
import { createOrganisationType } from '../../dropdowns/organizationTypes';
import { createStatus } from '../../dropdowns/status';
import { createStaffStrength } from '../../dropdowns/staffStrength';
import { createState } from '../../dropdowns/state';
import { createCountries } from '../../dropdowns/country';
import { createAmountInvested } from '../../dropdowns/amountInvested';
import { createCommunity } from '../../dropdowns/communities';
import { createFocusArea } from '../../dropdowns/focusArea';
import { createFrequency } from '../../dropdowns/frequency';
import { createTargetAudience } from '../../dropdowns/targetAudience';

export const getStakeholderData = async () => {
  const data = {};
  data.organisationName = Faker.company.companyName();
  data.beneficiaries = [];
  data.cacRcNumber = Faker.random.words();
  data.email = Faker.internet.email();
  data.founder = Faker.name.findName();
  data.impactTypeId = (await createImpactType())._id;
  data.localManagerEmail = Faker.internet.email();
  data.localManagerMobile = Faker.random.number();
  data.localManagerName = Faker.name.findName();
  data.notes = Faker.random.words();
  data.partnerships = [];
  data.organisationTypeId = (await createOrganisationType())._id;
  data.partnerWithGovernment = Faker.random.boolean();
  data.phoneNumber = Faker.phone.phoneNumber();
  data.phoneNumber2 = Faker.random.number();
  data.phoneNumber3 = Faker.random.number();
  data.registrationStatusId = (await createStatus())._id;
  data.staffStrengthRangeId = (await createStaffStrength())._id;
  data.stakeholderAddress = [
    {
      countryId: (await createCountries())._id,
      stateId: (await createState())._id,
      address: Faker.random.words(3),
      addressType: 'HOME',
    },
    {
      countryId: (await createCountries())._id,
      stateId: (await createState())._id,
      address: Faker.random.words(3),
      addressType: 'BRANCH',
    },
  ];
  data.volunteersCount = Faker.random.number();
  data.website = Faker.internet.url();
  data.yearOfCacREG = '1998';

  return data;
};

export const getBeneficiaryData = async () => {
  const data = {};
  data.amountInvestedRange = (await createAmountInvested())._id;
  data.beneficiaryServiceType = [];
  data.community = [
    (await createCommunity())._id,
    (await createCommunity())._id,
  ];
  data.duration = Faker.random.number();
  data.focusArea = (await createFocusArea())._id;
  data.frequency = (await createFrequency())._id;
  data.note = Faker.random.words();
  data.serviceName = Faker.company.companyName();
  data.sourceOfFunding = [
    {
      sourceOfFundingId: '5c9256d30167a3091877c5a8',
      amountInvestedRange: '5c9256d20167a3091877c59a',
    },
  ];
  data.targetAudienceId = (await createTargetAudience())._id;
  data.totalNumberOfBeneficiaries = Faker.random.number();

  return data;
};
