import keystone from 'keystone';

const PartnershipType = new keystone.List('PartnershipType');

PartnershipType.add({
  partnershipTypeName: { type: String },
  description: { type: String },
});

PartnershipType.defaultColumns = 'partnershipTypeName';

PartnershipType.register();

export default PartnershipType;
