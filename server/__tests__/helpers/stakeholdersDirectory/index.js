/* eslint-disable no-underscore-dangle */
import StakeholdersDirectory from '../../../models/stakeholdersDirectory';
import BasicInformation from '../../../models/stakeholdersDirectory/BasicInformation';
import BeneficiaryService from '../../../models/stakeholdersDirectory/BeneficiaryService';
import { faker, createUser } from '../commons/base';

export const makeBasicInformation = (overrides = {}) => {
  return {
    stakeholderName: faker.name.findName(10),
    email: faker.internet.email(10),
    organisationType: faker.random.word(10),
    registrationStatus: faker.random.word(10),
    yearOfRegistration: faker.date.past(),
    registrationNumber: String(faker.random.number()),
    volunteers: faker.name.findName(10),
    numberOfVolunteers: faker.random.number(),
    partnerships: faker.name.findName(10),
    partnershipType: faker.random.word(10),
    impactType: faker.random.word(10),
    operatingInEdoState: faker.random.boolean(),
    edoStateOperationStartYear: faker.date.past(),
    partnerWithEdoStateGovernment: faker.random.boolean(),
    country: faker.address.country(),
    state: faker.address.state(),
    founder: faker.name.findName(10),
    website: faker.internet.url(),
    headOfficeAddress: faker.address.streetAddress(),
    stateOfficeAddress: faker.address.streetAddress(),
    phoneNumberOne: faker.phone.phoneNumber(),
    phoneNumberTwo: faker.phone.phoneNumber(),
    phoneNumberThree: faker.phone.phoneNumber(),
    staffStrength: String(faker.random.number()),
    localContactPerson: faker.name.findName(10),
    contactPersonEmailAddress: faker.internet.email(10),
    contactPersonPhoneNumber: faker.phone.phoneNumber(),
    notes: faker.random.word(30),
    ...overrides,
  };
};

export const makeBeneficiaryService = (overrides = {}) => {
  return {
    serviceName: faker.name.findName(10),
    targetAudience: faker.name.findName(10),
    beneficiaryType: faker.random.word(10),
    numberOfMaleBeneciaries: faker.random.number(),
    numberOfFemaleBeneciaries: faker.random.number(),
    frequency: faker.random.number(),
    duration: faker.random.word(10),
    numberOfBeneciariesPerService: faker.random.number(),
    thematicPillars: faker.random.word(10),
    subTheme: faker.random.word(10),
    focusArea: faker.random.word(10),
    fundingSource: faker.random.word(10),
    amountInvested: String(faker.random.number()),
    country: faker.address.country(),
    state: faker.address.state(),
    localGovernment: faker.name.findName(10),
    ward: faker.name.findName(10),
    localCommunities: faker.name.findName(10),
    totalNumberOfBeneficiaries: faker.random.number(),
    notes: faker.random.word(30),
    ...overrides,
  };
};

export const createBasicInformation = (overrides = {}) =>
  BasicInformation.model.create(makeBasicInformation(overrides));

export const createBeneficiaryService = (overrides = {}) =>
  BeneficiaryService.model.create(makeBeneficiaryService(overrides));

export const makeStakeholdersDirectory = async (overrides = {}) => {
  const user = await createUser();
  const beneficiaryService = await createBeneficiaryService();
  const basicInformation = await createBasicInformation();
  return {
    creator: user._id,
    basicInformation: basicInformation._id,
    beneficiaryService: [beneficiaryService._id],
    ...overrides,
  };
};

export const createStakeholdersDirectory = async (overrides = {}) =>
  StakeholdersDirectory.model.create(
    await makeStakeholdersDirectory(overrides),
  );
