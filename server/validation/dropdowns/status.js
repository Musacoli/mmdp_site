import Joi from 'joi';

const addRegStatus = {
  body: {
    data: Joi.array().items([
      {
        registrationStatus: Joi.string()
          .required()
          .label('Registration Status'),
      },
    ]),
  },
};

export default { addRegStatus };
