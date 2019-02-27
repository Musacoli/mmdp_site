import keystone from 'keystone';
import ReturneeService from './ReturneeService';
import Address from './StakeholderAdress';
import StakeholderPartnership from './StakeholderPartnership';

const { Types } = keystone.Field;

const Stakeholder = new keystone.List('Stakeholder');

Stakeholder.add({
  organisationName: {
    type: Types.Text,
    index: true,
    unique: true,
  },
  organisationTypeId: { type: Types.Relationship, ref: 'OrganisationType' },
  registrationStatusId: {
    type: Types.Relationship,
    ref: 'RegistrationStatus',
  },
  impactTypeId: { type: Types.Relationship, ref: 'ImpactType' },
  founder: { type: Types.Text },
  phoneNumber: { type: Types.Text },
  email: { type: Types.Email },
  website: { type: Types.Url },
  description: { type: Types.Text },
  staffStrengthRangeId: {
    type: Types.Relationship,
    ref: 'StaffStrengthRange',
  },
  edoStateOperationStartYear: { type: Types.Text },
  yearOfCacREG: { type: Types.Text },
  cacRcNumber: { type: Types.Text },
  volunteersCount: { type: Number },
  localManagerName: { type: Types.Text },
  localManagerEmail: { type: Types.Email },
  localManagerMobile: { type: Types.Number },
  partnerWithGovernment: { type: Boolean, default: false },
  challenges: { type: Types.Text },
  assistanceRequired: { type: Types.Text },
  locality: { type: Types.Select, options: 'International,local' },
  // additional fields from the interface/mock-ups
  notes: { type: Types.Text },
  phoneNumber1: { type: Types.Number },
  phoneNumber2: { type: Types.Number },
  phoneNumber3: { type: Types.Number },
});

Stakeholder.defaultColumns = 'organisationName';

// add custom error handling for handling error messages
Stakeholder.schema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    return next(
      new Error('Another stakeholder with this name already exists.'),
    );
  }
  return next();
});

// add logic for cascade delete for all models related
Stakeholder.schema.pre('remove', { query: true, document: true }, (next) => {
  // 'this' is the client being removed.
  ReturneeService.model.remove({ stakeholderId: this._id }).exec();
  Address.model.remove({ stakeholderId: this._id }).exec();
  StakeholderPartnership.model.remove({ stakeholder1Id: this._id }).exec();
  StakeholderPartnership.model.remove({ stakeholder2Id: this._id }).exec();
  return next();
});

Stakeholder.register();

export default Stakeholder;
