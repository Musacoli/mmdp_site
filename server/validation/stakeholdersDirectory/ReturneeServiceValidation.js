import Joi from 'joi';

export default {
  body: Joi.object({
    serviceName: Joi.string().required(),
    sourceOfFundingId: Joi.string(),
    averageNumberOfMaleBeneficiaries: Joi.number(),
    averageNumberOfFemaleBeneficiaries: Joi.number(),
    averageNumberOfBeneficiary: Joi.number(),
    amountInvestedRange: Joi.string(),
    targetAudienceId: Joi.string(),
    duration: Joi.number(),
    note: Joi.string(),
    beneficiaryTypeId: Joi.string(),
    comment: Joi.string(),
    meansOfAwareness: Joi.string(),
    frequency: Joi.number(),
    averageNumberOfBeneficiariesPerService: Joi.number(),
    totalNumberOfBeneficiaries: Joi.number(),
    serviceStatus: Joi.string(),
  }),
};
