import Joi from 'joi';

const partnershipType = {
  body: {
    data: Joi.array().items([
      {
        partnershipTypeName: Joi.string()
          .required()
          .label('partnershipTypeName'),
      },
    ]),
  },
};

export default { partnershipType };
