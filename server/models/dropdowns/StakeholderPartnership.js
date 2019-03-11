import keystone from 'keystone';

const { Types } = keystone.Field;

const StakeholderPartnership = new keystone.List('StakeholderPartnership');

StakeholderPartnership.add({
  stakeholder1Id: { type: Types.Relationship, ref: 'Stakeholder' },
  stakeholder2Id: { type: Types.Relationship, ref: 'Stakeholder' },
  partnershipTypeId: { type: Types.Relationship, ref: 'PartnershipType' },
  relationShip: { type: String },
});

StakeholderPartnership.defaultColumns = 'partnershipTypeId';

StakeholderPartnership.register();

export default StakeholderPartnership;
