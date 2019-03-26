import Joi from 'joi';

const addFunding = (item) => ({
  body: {
    data: Joi.array().items(item),
  },
});

export default addFunding;
