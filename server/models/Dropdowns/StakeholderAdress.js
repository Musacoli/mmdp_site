import keystone from 'keystone';

const { Types } = keystone.Field;

const StakeholderAddress = new keystone.List('StakeholderAddress');

StakeholderAddress.add({
  stakeholderId: { type: Types.Relationship, ref: 'Stakeholder' },
  stateId: { type: Types.Relationship, ref: 'State' },
  countryId: { type: Types.Relationship, ref: 'Country' },
  address: { type: String },
  addressType: { type: String },
});

StakeholderAddress.defaultColumns = 'Address';

StakeholderAddress.register();

export default StakeholderAddress;
