import Joi from 'joi';
import focus from './index';

const item = [
  {
    focusAreaName: Joi.string()
      .trim()
      .required(),
    subThemeId: Joi.string().required(),
  },
];

const focusArea = focus(item);

export default { focusArea };
