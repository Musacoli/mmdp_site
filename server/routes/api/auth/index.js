import keystone from 'keystone';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import responseMessage from '../../../constants/responseMessage';

export const user = () => (keystone.list('User'));

export const login = async (req, res) => {
  const { email, username, password } = req.body;

  const query = email ? { email } : { username };

  try {
    const userData = await user().model.findOne(query);
    if (!userData) return res.sendError(responseMessage.INVALID_CREDENTIALS, 401);

    if (!userData.confirmed) return res.sendError(responseMessage.UNCOMPLETED_ACCOUNT, 403);

    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword) return res.sendError(responseMessage.INVALID_CREDENTIALS, 401);

    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      id: userData._id,
      username: userData.username,
      email: userData.email,
      groups: userData.groups,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const data = {
      user: {
        ...payload,
        token,
      },
    };
    return res.sendSuccess(data, 200, responseMessage.SUCCESSFUL_LOGIN);
  } catch (err) {
    const error = err.message || '';
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
