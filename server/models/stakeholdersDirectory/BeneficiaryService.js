import keystone from 'keystone';

const BeneficiaryService = new keystone.List('BeneficiaryService');

BeneficiaryService.add({
  serviceName: { type: String },
  targetAudience: { type: String },
  beneficiaryType: { type: String },
  numberOfMaleBeneciaries: { type: Number },
  numberOfFemaleBeneciaries: { type: Number },
  frequency: { type: Number },
  duration: { type: String },
  numberOfBeneciariesPerService: { type: Number },
  thematicPillars: { type: String },
  subTheme: { type: String },
  focusArea: { type: String },
  fundingSource: { type: String },
  amountInvested: { type: String },
  country: { type: String },
  state: { type: String },
  localGovernment: { type: String },
  ward: { type: String },
  localCommunities: { type: String },
  totalNumberOfBeneficiaries: { type: Number },
  notes: { type: String },
});

BeneficiaryService.defaultColumns = 'serviceName';
BeneficiaryService.register();

export default BeneficiaryService;
