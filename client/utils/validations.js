import Joi from 'joi';

export const groupValidationSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
});

export default groupValidationSchema;
