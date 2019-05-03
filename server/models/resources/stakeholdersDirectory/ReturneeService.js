import keystone from 'keystone';
import BeneficiaryServiceCommunity from './BeneficiaryServiceCommunity';
import BeneficiaryServiceFundingSource from './BeneficiaryServiceFundingsource';
import BeneficiaryServiceType from './BeneficiaryServiceType';

const ReturneeService = new keystone.List('ReturneeService');
const { Types } = keystone.Field;

ReturneeService.add({
  serviceName: { type: String, unique: true },
  stakeholderId: {
    type: Types.Relationship,
    ref: 'Stakeholder',
    required: true,
    initial: false,
  },
  sourceOfFundingId: { type: Types.Relationship, ref: 'SourceOfFunding' },
  averageNumberOfMaleBeneficiaries: { type: Number },
  averageNumberOfFemaleBeneficiaries: { type: Number },
  averageNumberOfBeneficiary: { type: Number },
  amountInvestedRange: { type: Types.Relationship, ref: 'AmountInvestedRange' },
  focusArea: { type: Types.Relationship, ref: 'FocusArea' },
  duration: { type: Number },
  note: { type: String },
  beneficiaryTypeId: { type: Types.Relationship, ref: 'BeneficiaryType' },
  comment: { type: String },
  meansOfAwareness: { type: String },
  frequency: { type: Types.Relationship, ref: 'Frequency' },
  targetAudienceId: { type: Types.Relationship, ref: 'TargetAudience' },
  averageNumberOfBeneficiariesPerService: { type: Number },
  totalNumberOfBeneficiaries: { type: Number },
  serviceStatus: {
    type: Types.Select,
    options: ['Ongoing', 'Completed', 'Abandoned'],
  },
  localGovernmentArea: { type: Types.Relationship, ref: 'LGA' },
  community: { type: Types.Relationship, ref: 'Community' },
});

ReturneeService.defaultColumns = 'serviceName';

ReturneeService.schema.pre('remove', (next) => {
  // 'this' is the client being removed.
  BeneficiaryServiceCommunity.model
    .remove({ beneficiaryServiceId: this._id })
    .exec();
  BeneficiaryServiceFundingSource.model
    .remove({ beneficiaryServiceId: this._id })
    .exec();
  BeneficiaryServiceType.model
    .remove({ beneficiaryServiceId: this._id })
    .exec();
  return next();
});

ReturneeService.schema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    return next(
      new Error(
        'Another stakeholder Beneficiary with this name already exists.',
      ),
    );
  }
  return next();
});

ReturneeService.register();

export default ReturneeService;
