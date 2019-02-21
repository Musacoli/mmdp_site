import Joi from 'joi';

const addDocument = {
  body: {
    title: Joi.string(),
    files: {
      document: Joi.object({
        fieldname: Joi.string().required(),
        mimetype: Joi.string()
          .valid(['application/pdf'])
          .error(() => 'Document file must be a pdf'),
        filename: Joi.string().required(),
      }).required(),
    },
  },
};

const editDocument = {
  body: {
    title: Joi.string().required(),
    files: {
      document: Joi.object({
        fieldname: Joi.string().required(),
        mimetype: Joi.string()
          .valid(['application/pdf'])
          .error(() => 'Document file must be a pdf'),
        filename: Joi.string().required(),
      }),
    },
  },
};

export default {
  addDocument,
  editDocument,
};
