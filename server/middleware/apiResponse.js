import status from '../constants/status';

const apiResponse = (req, res, next) => {
  res.sendSuccess = (data, statusCode = 200, message) => {
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return res.status(statusCode).json({
      status: status.SUCCESS,
      message,
      data,
    });
  };

  res.sendError = (message, statusCode = 500, error) => {
    if (req.method === 'OPTIONS') {
      return res.status(statusCode).end();
    }

    const statusText =
      statusCode >= 400 && statusCode < 500 ? status.FAIL : status.ERROR;
    return res.status(statusCode).json({
      status: statusText,
      message,
      error,
    });
  };

  next();
};

export default apiResponse;
