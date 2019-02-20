import keystone from 'keystone';

const { Types } = keystone.Field;

const StakeholdersDirectory = new keystone.List('StakeholdersDirectory');

StakeholdersDirectory.add({
  creator: { type: Types.Relationship, ref: 'User' },
  basicInformation: { type: Types.Relationship, ref: 'BasicInformation' },
  beneficiaryService: {
    type: Types.Relationship,
    ref: 'BeneficiaryService',
    many: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

StakeholdersDirectory.defaultColumns = 'beneficiaryService';
StakeholdersDirectory.register();

export default StakeholdersDirectory;
