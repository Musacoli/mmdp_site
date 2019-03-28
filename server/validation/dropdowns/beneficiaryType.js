import Joi from 'joi';

const addBeneficiaryType = {
  body: {
    data: Joi.array().items([
      {
        beneficiaryTypeName: Joi.string()
          .required()
          .label('Beneficiary Type'),
      },
    ]),
  },
};

export default { addBeneficiaryType };
