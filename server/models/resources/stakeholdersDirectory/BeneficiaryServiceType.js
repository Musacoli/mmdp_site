import keystone from 'keystone';

const { Types } = keystone.Field;

const BeneficiaryServiceType = new keystone.List('BeneficiaryServiceType');

BeneficiaryServiceType.add({
  beneficiaryServiceId: { type: Types.Relationship, ref: 'ReturneeService' },
  beneficiaryTypeId: { type: Types.Relationship, ref: 'BeneficiaryType' },
  noOfMaleBeneficiaries: { type: Types.Number, required: true, default: 0 },
  noOfFemaleBeneficiaries: { type: Types.Number, required: true, default: 0 },
  // total number of beneficiaries is a computed field based on the two other numeric fields
  totalNumberOfBeneficiaries: {
    type: Types.Number,
    required: true,
    watch: 'noOfMaleBeneficiaries,noOfFemaleBeneficiaries',
    value() {
      return this.noOfMaleBeneficiaries + this.noOfFemaleBeneficiaries;
    },
  },
});

BeneficiaryServiceType.defaultColumns = 'beneficiaryServiceId';

BeneficiaryServiceType.register();

export default BeneficiaryServiceType;
