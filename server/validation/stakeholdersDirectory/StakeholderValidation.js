import Joi from 'joi';
import ReturneeServiceValidation from './ReturneeServiceValidation';

export default {
  body: Joi.object({
    organisationName: Joi.string()
      .required()
      .label('Stakeholder Name'),
    organisationTypeId: Joi.string().label('Organisation Type'),
    registrationStatusId: Joi.string().label('Registration Status'),
    impactTypeId: Joi.string().label('Impact Type'),
    founder: Joi.string().label('Founder Name'),
    phoneNumber: Joi.string(),
    email: Joi.string().email(),
    website: Joi.string().uri(),
    description: Joi.string(),
    staffStrengthRangeId: Joi.string().label('Staff Strength'),
    edoStateOperationStartYear: Joi.string(),
    yearOfCacREG: Joi.string().label('Year Of Registration'),
    cacRcNumber: Joi.string().label('Registration Number'),
    volunteersCount: Joi.number().label('Number of Volunteers'),
    localManagerName: Joi.string().label('Local Manager Name'),
    localManagerEmail: Joi.string()
      .email()
      .label('Local Manager Email'),
    localManagerMobile: Joi.string().label('Local Manager Mobile'),
    partnerWithGovernment: Joi.boolean().label('Partner with the government'),
    challenges: Joi.string(),
    assistanceRequired: Joi.string(),
    locality: Joi.string(),
    // additional fields from mock ups
    notes: Joi.string(),
    phoneNumber1: Joi.number(),
    phoneNumber2: Joi.number(),
    phoneNumber3: Joi.number(),
    stakeholderAddress: Joi.array().items(
      // home office address
      Joi.object({
        countryId: Joi.string()
          .required()
          .label('Country'),
        stateId: Joi.string().label('State'),
        address: Joi.string()
          .required()
          .label('Office Address'),
        addressType: Joi.string()
          .valid('HOME', 'BRANCH')
          .required(),
      }).required(),
    ),
    partnerships: Joi.array().items(
      Joi.object({
        stakeholder2Id: Joi.string()
          .required()
          .label('Stakeholder Partner'),
        partnershipTypeId: Joi.string()
          .required()
          .label('Partnership Type'),
      }),
    ),
    beneficiaries: Joi.array()
      .items(ReturneeServiceValidation.body)
      .label('beneficiary Information'),
  }),
};
