import Joi from 'joi';

export default {
  body: Joi.object({
    serviceName: Joi.string().required(),
    averageNumberOfMaleBeneficiaries: Joi.number(),
    averageNumberOfFemaleBeneficiaries: Joi.number(),
    averageNumberOfBeneficiary: Joi.number(),
    amountInvestedRange: Joi.string(),
    targetAudienceId: Joi.string(),
    duration: Joi.number(),
    note: Joi.string(),
    comment: Joi.string(),
    meansOfAwareness: Joi.string(),
    frequency: Joi.string(),
    averageNumberOfBeneficiariesPerService: Joi.number(),
    totalNumberOfBeneficiaries: Joi.number(),
    serviceStatus: Joi.string(),
    community: Joi.array().items(Joi.string()),
    focusArea: Joi.string().required(),
    sourceOfFunding: Joi.array().items(
      Joi.object({
        sourceOfFundingId: Joi.string().required(),
        amountInvestedRange: Joi.string().required(),
      }),
    ),
    beneficiaryServiceType: Joi.array().items(
      Joi.object({
        beneficiaryTypeId: Joi.string().required(),
        noOfMaleBeneficiaries: Joi.number().required(),
        noOfFemaleBeneficiaries: Joi.number().required(),
        totalNumberOfBeneficiaries: Joi.number().required(),
      }),
    ),
  }),
};
