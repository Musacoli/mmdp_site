import keystone from 'keystone';

const { Types } = keystone.Field;

const LGA = new keystone.List('LGA');

LGA.add({
  lgaName: { type: String },
  stateId: { type: Types.Relationship, ref: 'State' },
  description: { type: String },
});

LGA.defaultColumns = 'lgaName';

LGA.register();

export default LGA;
