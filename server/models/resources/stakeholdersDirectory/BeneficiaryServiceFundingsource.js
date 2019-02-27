import keystone from 'keystone';

const { Types } = keystone.Field;

const BeneficiaryServiceFundingSource = new keystone.List(
  'BeneficiaryServiceFundingSource',
);

BeneficiaryServiceFundingSource.add({
  beneficiaryServiceId: { type: Types.Relationship, ref: 'ReturneeService' },
  sourceOfFundingId: { type: Types.Relationship, ref: 'SourceOfFunding' },
  amountInvestedRange: { type: Types.Relationship, ref: 'AmountInvestedRange' },
});

BeneficiaryServiceFundingSource.defaultColumns = 'beneficiaryServiceId';

BeneficiaryServiceFundingSource.register();

export default BeneficiaryServiceFundingSource;
