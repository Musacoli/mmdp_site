import Joi from 'joi';

const addStateSVG = {
  body: {
    files: {
      StateSVGFile: Joi.object({
        mimetype: Joi.string()
          .valid('image/svg+xml')
          .error(() => 'Uploaded file must be in svg format'),
        // filename: Joi.string().required(),
        filename: Joi.exist(),
      }).required(),
    },
  },
};

export default {
  addStateSVG,
};
