import keystone from 'keystone';

const StaffStrength = new keystone.List('StaffStrength');

StaffStrength.add({
  staffStrength: { type: String },
  description: { type: String },
});

StaffStrength.relationship({
  ref: 'BasicInformation',
  refPath: 'StaffStrength',
  path: 'StaffStrength',
});
StaffStrength.register();

export default StaffStrength;
