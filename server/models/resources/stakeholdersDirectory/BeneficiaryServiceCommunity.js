import keystone from 'keystone';

const { Types } = keystone.Field;

const BeneficiaryServiceCommunity = new keystone.List(
  'BeneficiaryServiceCommunity',
);

BeneficiaryServiceCommunity.add({
  beneficiaryServiceId: { type: Types.Relationship, ref: 'ReturneeService' },
  communityId: { type: Types.Relationship, ref: 'Community' },
  countryId: { type: Types.Relationship, ref: 'Country' },
  stateId: { type: Types.Relationship, ref: 'State' },
  lgaId: { type: Types.Relationship, ref: 'LGA' },
});

BeneficiaryServiceCommunity.defaultColumns = 'beneficiaryServiceId';

// enforce unique together to prevent redundancy
BeneficiaryServiceCommunity.schema.index(
  { beneficiaryServiceId: 1, communityId: 1 },
  { unique: true },
);

BeneficiaryServiceCommunity.register();

export default BeneficiaryServiceCommunity;
