import keystone from 'keystone';

const RegistrationStatus = new keystone.List('RegistrationStatus');

RegistrationStatus.add({
  registrationStatus: { type: String },
  description: { type: String },
});

RegistrationStatus.defaultColumns = 'registrationStatus';

RegistrationStatus.register();

export default RegistrationStatus;
