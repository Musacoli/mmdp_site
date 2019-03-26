import Joi from 'joi';

const addCommunity = {
  body: Joi.object({
    data: Joi.array()
      .items(
        Joi.object({
          communityName: Joi.string()
            .required()
            .label('communityName'),
          wardId: Joi.string()
            .required()
            .label('wardId'),
        }),
      )
      .required(),
  }),
};
export default { addCommunity };
