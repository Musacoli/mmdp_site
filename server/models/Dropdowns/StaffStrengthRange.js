import keystone from 'keystone';

const StaffStrengthRange = new keystone.List('StaffStrengthRange');

StaffStrengthRange.add({
  staffStrength: { type: String },
  description: { type: String },
});

StaffStrengthRange.defaultColumns = 'staffStrength';

StaffStrengthRange.register();

export default StaffStrengthRange;
