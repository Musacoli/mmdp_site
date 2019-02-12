import Joi from 'joi';

const addReport = {
  body: {
    title: Joi.string().required(),
    files: {
      reportFile: Joi.object({
        fieldname: Joi.string().required(),
        mimetype: Joi.string()
          .valid('application/pdf')
          .error(() => 'Report file must be a pdf document'),
        filename: Joi.string().required(),
      }).required(),
    },
    reportType: Joi.string()
      .valid(['quarterly', 'annual'])
      .required(),
  },
};

const updateReport = {
  body: {
    title: Joi.string(),
    files: {
      reportFile: Joi.object({
        fieldname: Joi.string().required(),
        mimetype: Joi.string()
          .valid('application/pdf')
          .error(() => 'Report file must be a pdf document'),
        filename: Joi.string().required(),
      }),
    },
    reportType: Joi.string().valid(['quarterly', 'annual']),
  },
};

export default {
  addReport,
  updateReport,
};
