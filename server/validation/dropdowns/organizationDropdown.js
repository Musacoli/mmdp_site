import Joi from 'joi';

const validateorganizationType = {
  body: {
    data: Joi.array().items([
      {
        typeName: Joi.string()
          .required()
          .label('typeName'),
      },
    ]),
  },
};

export default validateorganizationType;
