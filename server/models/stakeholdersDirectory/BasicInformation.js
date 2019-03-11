import keystone from 'keystone';

const { Types } = keystone.Field;

const BasicInformation = new keystone.List('BasicInformation');

BasicInformation.add({
  stakeholderName: { type: String },
  email: { type: Types.Email },
  organisationType: { type: String },
  registrationStatus: { type: String },
  yearOfRegistration: { type: Date },
  registrationNumber: { type: String },
  volunteers: { type: String },
  numberOfVolunteers: { type: Number },
  partnerships: { type: String },
  partnershipType: { type: String },
  impactType: { type: String },
  operatingInEdoState: { type: Boolean, default: false },
  edoStateOperationStartYear: { type: Date },
  partnerWithEdoStateGovernment: { type: Boolean, default: false },
  country: { type: String },
  state: { type: String },
  totalAmountInvested: { type: String },
  founder: { type: String },
  website: { type: Types.Url },
  headOfficeAddress: { type: String },
  stateOfficeAddress: { type: String },
  phoneNumberOne: { type: String },
  phoneNumberTwo: { type: String },
  phoneNumberThree: { type: String },
  staffStrength: { type: Types.Relationship, ref: 'StaffStrength' },
  localContactPerson: { type: String },
  contactPersonEmailAddress: { type: Types.Email },
  contactPersonPhoneNumber: { type: String },
  notes: { type: String },
});

BasicInformation.defaultColumns = 'stakeholderName';
BasicInformation.register();

export default BasicInformation;
