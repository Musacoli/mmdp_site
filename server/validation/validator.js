import Joi from 'joi';

export default {
  login: {
    body: {
      email: Joi.when('username', {
        is: Joi.exist(),
        then: Joi.string().email(),
        otherwise: Joi.string()
          .email()
          .required(),
      }),
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
      password: Joi.string().required(),
    },
  },
  report: {
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
  },
  research: {
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
  },
  document: {
    body: {
      title: Joi.string().required(),
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
  },
  documentEdit: {
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
  },
  media: {
    body: {
      files: {
        mediaFile: Joi.object({
          fieldname: Joi.string().required(),
          mimetype: Joi.string()
            .valid([
              'image/gif',
              'image/png',
              'image/jpeg',
              'image/svg+xml',
              'video/jpeg',
              'video/mp4',
              'application/mp4',
              'video/3gpp',
              'video/3gpp2',
              'video/x-msvideo',
              'video/x-ms-wmv',
              'video/quicktime',
              'video/x-flv',
            ])
            .error(() => 'Media file must be a photo or video'),
          filename: Joi.string().required(),
        }).required(),
      },
    },
  },
};
