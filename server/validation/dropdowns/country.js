import Joi from 'joi';

const addCountry = {
  body: {
    data: Joi.array().items([
      {
        countryName: Joi.string().required(),
        description: Joi.string().required(),
      },
    ]),
  },
};

export default {
  addCountry,
};
