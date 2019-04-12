import Joi from 'joi';

const country = {
  body: {
    countryName: Joi.string().required(),
    files: {
      countrySvgFile: Joi.object({
        mimetype: Joi.string()
          .valid('image/svg+xml')
          .error(() => 'File must be an svg document'),
        filename: Joi.string().required(),
      }).required(),
    },
  },
};

export default country;
