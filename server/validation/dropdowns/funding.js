import Joi from 'joi';
import getAddFunding from './index';

const item = [
  {
    sourceOfFundingName: Joi.string().required(),
  },
];

const addFunding = getAddFunding(item);

export default { addFunding };
