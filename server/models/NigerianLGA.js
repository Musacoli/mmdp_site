import keystone from 'keystone';

const { Types } = keystone.Field;

const NigerianLGA = new keystone.List('NigerianLGA');

NigerianLGA.add({
  name: { type: Types.Text, required: true, unique: true, index: true },
  state: {
    type: Types.Relationship,
    ref: 'NigerianStates',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

NigerianLGA.defaultColumns = 'name';
NigerianLGA.register();

export default NigerianLGA;
