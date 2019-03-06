import jwt, { TokenExpiredError } from 'jsonwebtoken';
import status from '../constants/status';
import responseMessages from '../constants/responseMessage';
import User from '../models/User';

const deriveError = (err) => {
  const message =
    err instanceof TokenExpiredError
      ? responseMessages.TOKEN_EXPIRED
      : responseMessages.INVALID_TOKEN;
  return {
    status: status.ERROR,
    message,
  };
};

const getToken = (req) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.trim().length === 0
  ) {
    return null;
  }
  // expects authorization header to contain value such as `Bearer {token}`
  return req.headers.authorization.split(' ')[1];
};

const checkAuth = async (req) => {
  const token = getToken(req);
  let error = null;
  try {
    if (token) {
      const userData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.model.findOne({ email: userData.email });
    } else {
      error = {
        status: status.ERROR,
        message: responseMessages.TOKEN_NOT_PROVIDED,
      };
    }
  } catch (err) {
    error = deriveError(err);
  }
  return error;
};

/**
 * Checks whether user has provided has provided authorization headers. If
 * successful, it adds the user object to the request object and allows
 * the request to proceed.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
export const authOptional = async (req, res, next) => {
  await checkAuth(req);
  return next();
};

/**
 * Authenticates a request by checking the authorization header. If successful,
 * it adds the user object to the request object and allows the request to
 * proceed. Else, it returns a 401 error with the appropriate message.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const authenticate = async (req, res, next) => {
  const error = await checkAuth(req);
  if (!error) {
    return next();
  }
  return res.status(401).json(error);
};

export default authenticate;
