
import keystone from 'keystone';

const User = keystone.list('User');

export const list = (req, res) => {
  User.model.find((err, data) => {
    if (err) return res.apiError('database error', err);

    res.apiResponse({
      user: data
    });
  }).limit(Number(req.query.limit));
};
