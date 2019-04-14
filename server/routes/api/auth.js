import keystone from 'keystone';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sprintf } from 'sprintf-js';
import responseMessage from '../../constants/responseMessage';
import { sendResetPasswordEmail } from '../../utils/mailer';
import { fields } from '../../constants/controllerConstants';
import { hasPassword } from '../../utils/validators';

export const user = () => keystone.list('User');

export const login = async (req, res) => {
  const { email, username, password } = req.body;

  const query = email ? { email } : { username };

  try {
    const userData = await user()
      .model.findOne(query)
      .populate('groups')
      .exec();

    if (!userData)
      return res.sendError(responseMessage.INVALID_CREDENTIALS, 401);

    if (!userData.confirmed)
      return res.sendError(responseMessage.UNCOMPLETED_ACCOUNT, 403);

    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword)
      return res.sendError(responseMessage.INVALID_CREDENTIALS, 401);

    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      id: userData._id,
      username: userData.username,
      email: userData.email,
      permissions: await userData.permissions,
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

export const resetPassword = async (req, res) => {
  const { email, baseUrl } = req.body;
  try {
    const userData = await user().model.findOne({ email }, fields);
    if (userData) {
      const payload = {
        email: userData.email,
        baseUrl,
      };
      sendResetPasswordEmail(payload);
      return res.sendSuccess(
        {},
        200,
        'A password reset link has been sent to your email address',
      );
    }
    return res.sendError(
      sprintf(responseMessage.RESOURCE_NONE_EXIST, 'email'),
      404,
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};

export const changePassword = async (req, res) => {
  const data = req.body;
  try {
    await user().model.update(
      { email: req.user.email },
      {
        password: hasPassword(data.password),
      },
    );
    return res.sendSuccess(
      {},
      200,
      'Reset password successful. Login to your account',
    );
  } catch (error) {
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
};
