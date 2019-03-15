import mongoose from '../../utils/secondaryMongooseConnection';

export const StakeholderSchema = {
  organisationName: String,
  organisationTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'OrganisationType',
  },
  registrationStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'RegistrationStatus',
  },
  impactTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ImpactType',
  },
  founder: String,
  phoneNumber: String,
  email: String,
  website: String,
  description: String,
  staffStrengthRangeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'staffStrength',
  },
  edoStateOperationStartYear: String,
  yearOfCacREG: String,
  cacRcNumber: String,
  volunteersCount: String,
  localManagerName: String,
  localManagerEmail: String,
  localManagerMobile: String,
  partnerWithGovernment: Number,
  challenges: String,
  assistanceRequired: String,
  locality: String,
};

export const stakeholderAddressSchema = {
  stakeholderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Stakeholder',
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'State',
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Country',
  },
  address: String,
  addressType: {
    type: String,
    required: true,
    enum: ['BRANCH', 'HOME'],
  },
};

export const PartnershipsSchema = {
  stakeholder1Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Stakeholder',
  },
  stakeholder2Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Stakeholder',
  },
  partnershipTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'PartnershipType',
  },
};

export const returneeServiceSchema = {
  serviceName: { type: String, unique: true },
  stakeholderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Stakeholder',
  },
  sourceOfFundingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SourceOfFunding',
  },
  averageNumberOfMaleBeneficiaries: { type: Number },
  averageNumberOfFemaleBeneficiaries: { type: Number },
  averageNumberOfBeneficiary: { type: Number },
  duration: { type: Number },
  note: { type: String },
  beneficiaryTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'BeneficiaryType',
  },
  comment: { type: String },
  meansOfAwareness: { type: String },
  frequency: { type: Number },
  targetAudienceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TargetAudience',
  },
  averageNumberOfBeneficiariesPerService: { type: Number },
  totalNumberOfBeneficiaries: { type: Number },
  serviceStatus: {
    type: { type: String },
    enum: ['Ongoing', 'Completed', 'Abandoned'],
  },
  amountInvestedRange: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'AmountInvestedRange',
  },
  localGovernmentArea: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'LGA',
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Community',
  },
  focusArea: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'FocusArea',
  },
  ward: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ward',
  },
};

/** fetch models already defined in the DB */
// eslint-disable-next-line import/no-mutable-exports
let ImpactType;
try {
  mongoose.model('AmountInvestedRange', new mongoose.Schema({}));
  mongoose.model('BeneficiaryType', new mongoose.Schema({}));
  mongoose.model('TargetAudience', new mongoose.Schema({}));
  mongoose.model('SourceOfFunding', new mongoose.Schema({}));
  mongoose.model('LGA', new mongoose.Schema({}));
  mongoose.model('Community', new mongoose.Schema({}));
  mongoose.model('FocusArea', new mongoose.Schema({}));
  mongoose.model('Ward', new mongoose.Schema({}));
  ImpactType = mongoose.model('ImpactType', new mongoose.Schema({}));
} catch (e) {
  throw e;
}

export const Stakeholder = mongoose.model(
  'Stakeholder',
  mongoose.Schema(StakeholderSchema),
);
export const Address = mongoose.model(
  'StakeholderAddress',
  mongoose.Schema(stakeholderAddressSchema),
);

export const Partnerships = mongoose.model(
  'StakeholderPartnership',
  mongoose.Schema(PartnershipsSchema),
);

export const returneeService = mongoose.model(
  'ReturneeService',
  mongoose.Schema(returneeServiceSchema),
);

export { ImpactType };
