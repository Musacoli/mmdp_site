import Joi from 'joi';

const addState = {
  body: {
    data: Joi.array().items([
      {
        stateName: Joi.string()
          .required()
          .label('stateName'),
        countryId: Joi.string()
          .required()
          .label('countryId'),
      },
    ]),
  },
};

export default { addState };
