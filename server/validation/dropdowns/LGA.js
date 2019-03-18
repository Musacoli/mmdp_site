import Joi from 'joi';

const validateLGA = {
  body: {
    data: Joi.array().items([
      {
        lgaName: Joi.string()
          .required()
          .label('lgaName'),
        stateId: Joi.string()
          .required()
          .label('stateId'),
      },
    ]),
  },
};

export default { validateLGA };
