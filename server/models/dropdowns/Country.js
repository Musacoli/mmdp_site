import keystone from 'keystone';

const Country = new keystone.List('Country');

Country.add({
  countryName: { type: String },
  description: { type: String },
});

Country.defaultColumns = 'countryName';

Country.register();

export default Country;
