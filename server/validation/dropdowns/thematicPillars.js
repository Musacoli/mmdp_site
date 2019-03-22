import Joi from 'joi';

const addThermaticPillar = {
  body: {
    data: Joi.array().items([
      {
        pillarTitle: Joi.string()
          .required()
          .label('pillarTitle'),
        description: Joi.string()
          .allow('')
          .optional(),
      },
    ]),
  },
};

const updateManyThermaticPillars = {
  body: {
    data: Joi.array().items([
      {
        pillarTitle: Joi.string()
          .required()
          .label('pillarTitle'),
        description: Joi.string()
          .label('description')
          .allow('')
          .optional(),
      },
    ]),
  },
};

const updateThermaticPillar = {
  params: {
    id: Joi.string().required(),
  },
  body: {
    data: Joi.object({
      pillarTitle: Joi.string().required(),
      description: Joi.string()
        .allow('')
        .optional(),
    }),
  },
};

export default {
  addThermaticPillar,
  updateManyThermaticPillars,
  updateThermaticPillar,
};
