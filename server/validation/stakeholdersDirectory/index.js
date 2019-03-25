
import Joi from 'joi';

export default {
  staffStrength: {
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
  },
};
