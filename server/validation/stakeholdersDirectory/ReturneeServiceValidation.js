import Joi from 'joi';

export default {
  body: Joi.object({
    _id: Joi.string().label('beneficiary Identity'),
    serviceName: Joi.string()
      .required()
      .label('Service Name'),
    amountInvestedRange: Joi.string().label('Amount invested range'),
    targetAudienceId: Joi.string().label('Target  Audience'),
    duration: Joi.number(),
    note: Joi.string(),
    comment: Joi.string(),
    meansOfAwareness: Joi.string().label('Means of Awareness'),
    frequency: Joi.string(),
    averageNumberOfBeneficiariesPerService: Joi.number().label(
      'Average Number of Beneficiaries per Service',
    ),
    totalNumberOfBeneficiaries: Joi.number().label(
      'Total number of beneficiaries',
    ),
    serviceStatus: Joi.string().label('Service  Status'),
    community: Joi.array().items(Joi.string()),
    focusArea: Joi.string()
      .required()
      .label('Focus Area'),
    sourceOfFunding: Joi.array().items(
      Joi.object({
        sourceOfFundingId: Joi.string()
          .required()
          .label('Source of  Funding'),
        amountInvestedRange: Joi.string().label('Amount invested Range'),
      }),
    ),
    beneficiaryServiceType: Joi.array().items(
      Joi.object({
        beneficiaryTypeId: Joi.string()
          .required()
          .label('Beneficiary Type'),
        noOfMaleBeneficiaries: Joi.number()
          .required()
          .label('Number of Male Beneficiaries'),
        noOfFemaleBeneficiaries: Joi.number()
          .required()
          .label('Number of Female Beneficiaries'),
        totalNumberOfBeneficiaries: Joi.number()
          .required()
          .label('Total Number of  Beneficiaries'),
      }),
    ),
  }),
};
