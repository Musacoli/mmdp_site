import Joi from 'joi';

const addMedia = {
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
};

export default {
  addMedia,
};
