import keystone from 'keystone';

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
  locality: { type: Types.Select, options: 'Local,International' },
});

Stakeholder.defaultColumns = 'stakeholderName';
Stakeholder.register();

export default Stakeholder;
