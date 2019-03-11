import keystone from 'keystone';

const { Types } = keystone.Field;

const BeneficiaryType = new keystone.List('BeneficiaryType');

BeneficiaryType.add({
  beneficiaryTypeName: { type: Types.Text },
  description: { type: Types.Text },
});

BeneficiaryType.defaultColumns = 'beneficiaryTypeName';

BeneficiaryType.register();

export default BeneficiaryType;
