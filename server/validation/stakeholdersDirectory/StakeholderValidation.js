import Joi from 'joi';

export default {
  body: Joi.object({
    organisationName: Joi.string().required(),
    organisationTypeId: Joi.string(),
    registrationStatusId: Joi.string(),
    impactTypeID: Joi.string(),
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
  }),
};
