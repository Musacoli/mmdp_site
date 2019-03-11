import keystone from 'keystone';

const TargetAudience = new keystone.List('TargetAudience');

TargetAudience.add({
  audienceType: { type: String },
  description: { type: String },
});

TargetAudience.defaultColumns = 'audienceType';

TargetAudience.register();

export default TargetAudience;
