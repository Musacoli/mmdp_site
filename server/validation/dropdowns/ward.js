import Joi from 'joi';

const addWard = {
  body: {
    data: Joi.array().items([
      {
        wardName: Joi.string()
          .required()
          .label('wardName'),
        lgaId: Joi.string()
          .required()
          .label('lgaId'),
      },
    ]),
  },
};

export default { addWard };
