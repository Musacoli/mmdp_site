import _ from 'lodash';
import Faker from 'faker';
import {
  handleFormValidation,
  preSubmitValidationAndCleanup,
  removeEmptyFields,
  removeNonEssentialFields,
  validateRequiredFields,
} from '../../../../utils/resources/stakeholderDirectory/formValidation';
import {
  basicInformationTemplate, beneficiaryInformationTemplate,
  stakeholderAddressItemTemplate,
} from '../../../../utils/resources/stakeholderDirectory/staticFields';

export const getStakeholderData = () => {
  const data = _.cloneDeep(basicInformationTemplate);
  data.organisationName = Faker.company.companyName();
  data.beneficiaries = [];
  data.cacRcNumber = Faker.random.words();
  data.email = Faker.internet.email();
  data.founder = Faker.name.findName();
  data.impactTypeId = Faker.random.uuid();
  data.localManagerEmail = Faker.internet.email();
  data.localManagerMobile = Faker.phone.phoneNumber();
  data.localManagerName = Faker.name.findName();
  data.notes = Faker.random.words();
  data.partnerships = [];
  data.organisationTypeId = Faker.random.uuid();
  data.partnerWithGovernment = Faker.random.boolean();
  data.phoneNumber = Faker.phone.phoneNumber();
  data.phoneNumber2 = Faker.phone.phoneNumber();
  data.phoneNumber3 = Faker.phone.phoneNumber();
  data.registrationStatusId = Faker.random.uuid();
  data.staffStrengthRangeId = Faker.random.uuid();
  data.stakeholderAddress = [];
  data.volunteersCount = Faker.random.number();
  data.website = Faker.internet.url();
  data.yearOfCacREG = Faker.random.number();

  return data;
};

export const getBeneficiaryData = () => {
  const data = _.cloneDeep(beneficiaryInformationTemplate);
  data.amountInvestedRange = Faker.random.uuid();
  data.beneficiaryServiceType = [];
  data.community = [];
  data.country = Faker.address.country();
  data.state = Faker.address.country();
  data.duration = Faker.random.number();
  data.focusArea = Faker.random.uuid();
  data.frequency = Faker.random.uuid();
  data.localGovernmentArea = [];
  data.note = Faker.random.words();
  data.serviceName = Faker.company.companyName();
  data.sourceOfFunding = [Faker.random.uuid(), Faker.random.uuid()];
  data.subTheme = Faker.random.uuid();
  data.ward = [];
  data.targetAudienceId = Faker.random.uuid();
  data.thematicPillars = Faker.random.uuid();
  data.totalNumberOfBeneficiaries = Faker.random.number();

  return data;
};

describe('test form validation functions', () => {
  const object = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  };

  it('should should remove non essential fields', () => {
    const nonEssential = ['field1', 'field2', 'field5'];
    const essential = removeNonEssentialFields(object, nonEssential);

    expect(essential.field1).toBe(undefined);
    expect(essential.field2).toBe(undefined);
    expect(essential.field5).toBe(undefined);
  });

  it('should remove all empty fields', () => {
    const nonEmpty = removeEmptyFields(object);
    expect(Object.keys(nonEmpty).length).toEqual(0);
  });

  it('should validate all required fields', () => {
    const required = ['field1', 'field2', 'field5', 'field6'];
    object.field6 = [];
    const missing = validateRequiredFields(object, required);
    expect(required).toEqual(missing);
  });

  it('should handle form validation basic Information and return true', async () => {
    const state = {
      stakeholderData: _.cloneDeep(basicInformationTemplate),
      requireStakeholderFields: ['organisationName'],
      requiredBeneficiaryFields: [],
      step: 1,
    };
    const hasError = await handleFormValidation(state);
    expect(hasError).toBe(true);
  });
  it('should handle form validation basic Information and return false', async () => {
    const state = {
      stakeholderData: _.cloneDeep(basicInformationTemplate),
      requireStakeholderFields: [],
      requiredBeneficiaryFields: [],
      step: 1,
    };
    const hasError = await handleFormValidation(state);
    expect(hasError).toBe(false);
  });
  it('should handle form validation for beneficiary Information and return true', async () => {
    const state = {
      stakeholderData: _.cloneDeep(basicInformationTemplate),
      requireStakeholderFields: [],
      requiredBeneficiaryFields: ['serviceName'],
      step: 2,
    };
    // populate beneficiaries with an empty Template
    state.stakeholderData.beneficiaries[0] = _.cloneDeep(
      beneficiaryInformationTemplate,
    );
    const hasError = await handleFormValidation(state);
    expect(hasError).toBe(true);
  });
  it('should handle form validation for beneficiary Information and return false', async () => {
    const state = {
      stakeholderData: _.cloneDeep(basicInformationTemplate),
      requireStakeholderFields: [],
      requiredBeneficiaryFields: ['serviceName'],
      step: 2,
    };
    // populate beneficiaries with an empty Template
    state.stakeholderData.beneficiaries[0] = _.cloneDeep(
      beneficiaryInformationTemplate,
    );
    state.stakeholderData.beneficiaries[0].serviceName = 'some name';
    const hasError = await handleFormValidation(state);
    expect(hasError).toBe(false);
  });

  it('should handle form validation for beneficiary Information array fields and return true', async () => {
    const state = {
      stakeholderData: _.cloneDeep(basicInformationTemplate),
      requireStakeholderFields: [],
      requiredBeneficiaryFields: ['community'],
      step: 2,
    };
    // populate beneficiaries with an empty Template
    state.stakeholderData.beneficiaries[0] = _.cloneDeep(
      beneficiaryInformationTemplate,
    );
    // state.stakeholderData.beneficiaries[0].serviceName = 'some name';
    const hasError = await handleFormValidation(state);
    expect(hasError).toBe(true);
  });
  it('should handle form validation for beneficiary Information array fields and return false', async () => {
    const state = {
      stakeholderData: _.cloneDeep(basicInformationTemplate),
      requireStakeholderFields: [],
      requiredBeneficiaryFields: ['community'],
      step: 2,
    };
    // populate beneficiaries with an empty Template
    state.stakeholderData.beneficiaries[0] = _.cloneDeep(
      beneficiaryInformationTemplate,
    );
    state.stakeholderData.beneficiaries[0].community = ['', ''];
    const hasError = await handleFormValidation(state);
    expect(hasError).toBe(false);
  });

  it('should process payload data ', () => {
    const stakeholderData = getStakeholderData();
    const addressData = stakeholderAddressItemTemplate;
    addressData.country = 'country';
    addressData.headOfficeAddress = 'home';
    addressData.state = 'state';
    addressData.stateOfficeAddress = 'away';
    stakeholderData.beneficiaries.push(getBeneficiaryData());
    stakeholderData.beneficiaries.push(getBeneficiaryData());
    const cleaned = preSubmitValidationAndCleanup(stakeholderData, addressData);
    expect(typeof cleaned).toEqual('object');
  });
});
