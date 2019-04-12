import keystone from 'keystone';

const StateMap = new keystone.List('StateMap');

StateMap.add({
  uniqueId: { type: String },
  name: { type: String },
  url: { type: String },
  path: { type: String },
  countryName: { type: String },
});

StateMap.register();

export default StateMap;
