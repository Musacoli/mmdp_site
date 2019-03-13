import Joi from 'joi';

const addState = {
  body: {
    stateName: Joi.string().required(),
    countryId: Joi.string(),
    description: Joi.string(),
  },
};

export default { addState };
