/* eslint-disable radix */
import keystone from 'keystone';

export const Country = () => keystone.list('Country');

export const list = async (req, res) => {
  Country()
    .model.find()
    .exec((err, response) => {
      if (err) return res.apiError(err);
      res.sendSuccess(
        {
          data: response,
        },
        200,
      );
    });
};
