import keystone from 'keystone';

const OrganisationType = new keystone.List('OrganisationType');

OrganisationType.add({
  typeName: { type: String },
  description: { type: String },
});

OrganisationType.defaultColumns = 'typeName';

OrganisationType.register();

export default OrganisationType;
