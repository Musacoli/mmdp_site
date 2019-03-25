import Joi from 'joi';

const staffStrength = {
  body: {
    staffStrength: Joi.array().items([
      {
        staffStrength: Joi.string()
          .required()
          .label('staffStrength'),
        description: Joi.string().label('description'),
      },
    ]),
  },
};

export default staffStrength;
