import Joi from 'joi';

const addSubTheme = {
  body: {
    data: Joi.array().items([
      {
        subThemeName: Joi.string()
          .required()
          .label('subThemeName'),
        edoTarget: Joi.string()
          .required()
          .label('edoTarget'),
        thematicPillarId: Joi.string()
          .required()
          .label('thematicPillarId'),
      },
    ]),
  },
};

export default { addSubTheme };
