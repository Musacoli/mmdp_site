import keystone from 'keystone';

const { Types } = keystone.Field;

const NigerianStates = new keystone.List('NigerianStates');

NigerianStates.add({
  name: { type: Types.Text, required: true, unique: true, index: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

NigerianStates.defaultColumns = 'Objectives';
NigerianStates.register();

export default NigerianStates;
