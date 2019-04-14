import Joi from 'joi';

export const resetPassword = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    baseUrl: Joi.string()
      .uri()
      .trim()
      .required(),
  },
};

export const changePassword = {
  body: {
    password: Joi.string()
      .trim()
      .required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .options({
        language: {
          any: {
            allowOnly: 'Passwords do not match',
          },
        },
      }),
  },
};
