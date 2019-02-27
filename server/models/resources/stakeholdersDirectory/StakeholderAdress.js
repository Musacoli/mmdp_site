import keystone from 'keystone';

const { Types } = keystone.Field;

const Address = new keystone.List('StakeholderAddress');

Address.add({
  stakeholderId: { type: Types.Relationship, ref: 'Stakeholder' },
  stateId: { type: Types.Relationship, ref: 'State' },
  countryId: { type: Types.Relationship, ref: 'Country' },
  address: { type: String },
  addressType: { type: String },
});

Address.defaultColumns = 'address';

Address.register();

export default Address;
