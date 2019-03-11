import keystone from 'keystone';

const { Types } = keystone.Field;

const State = new keystone.List('State');

State.add({
  stateName: { type: String },
  countryId: { type: Types.Relationship, ref: 'Country' },
  description: { type: String },
});

State.defaultColumns = 'stateName';

State.register();

export default State;
