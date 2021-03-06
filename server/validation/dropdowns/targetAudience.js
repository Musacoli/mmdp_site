import Joi from 'joi';

const targetAudience = {
  body: {
    TargetAudience: Joi.array().items([
      {
        audienceType: Joi.string()
          .required()
          .label('audienceType'),
        description: Joi.string().label('description'),
      },
    ]),
  },
};

export default targetAudience;
