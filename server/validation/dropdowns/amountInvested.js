import Joi from 'joi';
import amountInvestedValidation from './index';

const item = [
  {
    amountInvestedRange: Joi.string()
      .trim()
      .required(),
  },
];

const validateAmount = amountInvestedValidation(item);

export default { validateAmount };
