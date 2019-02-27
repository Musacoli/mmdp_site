import keystone from 'keystone';
import { handleE11000 } from '../../../utils/mongooseErrorCodes';

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

ReturneeService.schema.post('save', handleE11000);
ReturneeService.schema.post('update', handleE11000);
ReturneeService.schema.post('findOneAndUpdate', handleE11000);
ReturneeService.schema.post('insertMany', handleE11000);

ReturneeService.register();

export default ReturneeService;
