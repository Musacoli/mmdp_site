import keystone from 'keystone';

const ImpactType = new keystone.List('ImpactType');

ImpactType.add({
  impactTypeName: { type: String },
  description: { type: String },
});

ImpactType.defaultColumns = 'impactTypeName';

ImpactType.register();

export default ImpactType;
