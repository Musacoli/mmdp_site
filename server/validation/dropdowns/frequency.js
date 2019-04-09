import Joi from 'joi';
import frequencyAdd from './index';

const item = [
  {
    frequencyValue: Joi.number()
      .integer()
      .positive()
      .required(),
    classification: Joi.string()
      .insensitive()
      .valid('weekly', 'monthly', 'quarterly', 'semi-annual', 'yearly')
      .required(),
  },
];

const frequencyNew = frequencyAdd(item);

export default { frequencyNew };
