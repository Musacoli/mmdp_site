import Joi from 'joi';
import ReturneeServiceValidation from './ReturneeServiceValidation';

export default {
  body: Joi.object({
    organisationName: Joi.string().required(),
    organisationTypeId: Joi.string(),
    registrationStatusId: Joi.string(),
    impactTypeId: Joi.string(),
    founder: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string().email(),
    website: Joi.string().uri(),
    description: Joi.string(),
    staffStrengthRangeId: Joi.string(),
    edoStateOperationStartYear: Joi.string(),
    yearOfCacREG: Joi.string(),
    cacRcNumber: Joi.string(),
    volunteersCount: Joi.number(),
    localManagerName: Joi.string(),
    localManagerEmail: Joi.string().email(),
    localManagerMobile: Joi.string(),
    partnerWithGovernment: Joi.boolean(),
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
        countryId: Joi.string().required(),
        stateId: Joi.string(),
        address: Joi.string().required(),
        addressType: Joi.string()
          .valid('HOME', 'BRANCH')
          .required(),
      }).required(),
    ),
    partnerships: Joi.array().items(
      Joi.object({
        stakeholder2Id: Joi.string().required(),
        partnershipTypeId: Joi.string().required(),
      }),
    ),
    beneficiaries: Joi.array().items(ReturneeServiceValidation.body),
  }),
};
