import Joi from 'joi';

const addResearch = {
  body: {
    title: Joi.string().required(),
    files: {
      researchFile: Joi.object({
        fieldname: Joi.string().required(),
        mimetype: Joi.string()
          .valid('application/pdf')
          .error(() => 'Research file must be a pdf document'),
        filename: Joi.string().required(),
      }).required(),
    },
  },
};

export default {
  addResearch,
};
