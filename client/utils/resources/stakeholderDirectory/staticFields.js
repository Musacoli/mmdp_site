export const additionalBeneficiaryInformationFields = {
  thematicPillars: '',
  subTheme: '',
  country: '',
  state: '',
  ward: [],
  localGovernmentArea: [],
};
export const beneficiaryInformationTemplate = {
  serviceName: '',
  sourceOfFunding: [],
  amountInvestedRange: '',
  targetAudienceId: '',
  duration: '',
  note: '',
  beneficiaryServiceType: [],
  frequency: '',
  totalNumberOfBeneficiaries: 0,
  focusArea: '',
  community: [], // additional fields
  ...additionalBeneficiaryInformationFields,
};
export const basicInformationTemplate = {
  organisationName: '',
  organisationTypeId: '',
  registrationStatusId: '',
  impactTypeId: '',
  founder: '',
  phoneNumber: '',
  email: '',
  website: '',
  staffStrengthRangeId: '',
  yearOfCacREG: '',
  cacRcNumber: '',
  volunteersCount: '',
  localManagerName: '',
  localManagerEmail: '',
  localManagerMobile: '',
  partnerWithGovernment: '',
  locality: 'local',
  notes: '',
  stakeholderAddress: [],
  beneficiaries: [],
  partnerships: [],
  phoneNumber2: '',
  phoneNumber3: '',
};
export const partnershipItemTemplate = {
  stakeholder2Id: '',
  partnershipTypeId: '',
};
export const beneficiaryTypeTemplate = {
  beneficiaryTypeId: '',
  noOfMaleBeneficiaries: 0,
  noOfFemaleBeneficiaries: 0,
  totalNumberOfBeneficiaries: 0,
};
export const stakeholderAddressItemTemplate = {
  country: '',
  state: '',
  stateOfficeAddress: '',
  headOfficeAddress: '',
  hasVolunteersDropdown: '',
};
